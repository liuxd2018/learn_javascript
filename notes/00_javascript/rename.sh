#!/bin/bash

# converting - to _ in all files in current directory
# where this script is.

# don't works for filename with space in it

for i in `ls *.*`
do
NEW=`echo $i|tr ' ' '_'`
#mv $i $NEW
echo $NEW
done
