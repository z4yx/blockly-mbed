#!/bin/bash

#python core_build_list_generator.py
node node_compress_generator.js
node node_compress_utility.js
node node_compress_block.js
#node node_compress_core.js
mv node_compressed_*.js release/
cp vs.css release/