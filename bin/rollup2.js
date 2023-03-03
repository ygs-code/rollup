#!/usr/bin/env node

import { rollup } from 'rollup';
import config from './rollup.config.js';

const build = async () => {
    const bundle = await rollup(config);

    await bundle.write(config);
};


build()