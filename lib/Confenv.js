'use strict';

const util    = require('util');
const fs      = require('fs');
const path    = require('path');


const helper  = require('./helper.js');

class Confenv {
    constructor () {
        // Holds the config object
        this._config = {};
        //this._log = logger.getLogger('config');
        // Caches the path to configs
        this._paths = [];
        this._defaultName = 'default.env';

        //this._log.info('Load default config');
        this.read(this._defaultName);
    }

    /*
     * Used to reload configuration which already loaded
     *
     * return void
     */
    reload () {
        //this._log.info('Reloading configs: %j', this._paths);
        this._paths.forEach((filepath) => this._read(filepath));
    }

    /*
     * Used to load configuration
     *
     * return this
     */
    read(file) {
        let filepath = process.cwd(), // __root in globals
            flag = true;

        // Seek config file in cwd and parent directories
        do {
            try {
                fs.accessSync(path.join(filepath, file), fs.F_OK);
                flag = false;
            } catch (e) {
                filepath = filepath.split(path.sep).slice(0, -1).join(path.sep);
            }
        } while (filepath.length > 0 && flag);

        if (!filepath) {
            //this._log.warn('Error read config `%s`: file not found', file);
            throw new Error(util.format('Error read config `%s`: file not found', file));
        } else {
            //this._log.debug('Found config `%s` in path `%s`', file, filepath);
            // Cache the path
            this._paths.push(path.join(filepath, file));
            this._read(this._paths.slice(-1)[0]);
        }

        return this;
    }

    get(key) {
        let value = helper.spread(this._config, key);
        if ('string' == typeof value) {
            return value;
        } else {
            return new Object(value);
        }
    }

    _read(filepath) {
        let file;
        try {
            file = fs.readFileSync(filepath, { encoding: 'utf-8' });
            file = file.split('\n');
        } catch (e) {
            //this._log.error('Error read config `%s`: ', filepath, e);
            throw new Error(util.format('Error read config `%s`: %j', filepath, e));

            return {};
        }

        file.reduce((config, str) => {
            // Remove comments from the end of config line
            str = str.split('#')[0].trim();

            // Check config line is not empty
            if (str.length > 0) {
                str = str.split('=');
                let key = str.shift().trim().split('.');
                let value = str.join('=').trim();

                this._spread(config, key, value);
            }

            return config;
        }, this._config);

        //this._log.info('Config `%s` loaded', filepath);

        return this._config;
    }

    _spread (obj, is, value) {
        if (typeof is == 'string') {
            return _spread(obj, is.split('.'), value);
        } else if (is.length == 1 && value !== undefined) {
            return obj[is[0]] = value;
        } else if (is.length == 0) {
            return obj;
        } else if (!obj[is[0]] && undefined == value) {
            return undefined;
        } else {
            return _spread(obj[is[0]] || (obj[is[0]] = {}), is.slice(1), value);
        }
    }
}

module.exports = (new Confenv());
