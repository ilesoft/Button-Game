#!/bin/bash

# Make sure you have terser and node.js installed
# Make sure you have cssmin.py
# ===> http://github.com/zacharyvoase/cssmin

# The .env file example
# FAVICON_FILE= name of the favicon file in current working directory
# CSSMIN_PATH= path to your cssmin.py file

# get variables from .env file
set -o allexport
source .env
set +o allexport

# Favicon filename:
FAV=`find $(pwd) -name "$FAVICON_FILE"  -print`

# Remove old minifictions
RM_FILES=`find $(pwd) \( -name "*.min.js" -o -name "*.min.css" \) -print`
rm $RM_FILES 2> /dev/null # suppress warning in case nonexistent minifications

# Get Cascading Style Sheets to minify in current working directory
CSS_FILES=`find $(pwd) -name "*.css" -print`

# Minify JavaScripts one file at a time
for file in $CSS_FILES
do
  cat $file | python3 $CSSMIN_PATH > "${file}min"
  # Rename files
  mv "${file}min" "${file%.*}.min.css"
done

# Get JavaScript to minify in current working directory
JS_FILES=`find $(pwd) -name "*.js" -print`

# Minify JavaScripts one file at a time
for file in $JS_FILES
do
  terser $file -o "${file}min"
  # Rename files
  mv "${file}min" "${file%.*}.min.js"
done

# Base64 encode favicon.ico to include it directly to html
if [ -n "${FAV// /}" ]; then
  base64 -w 0 $FAV > favicon.base64
fi
