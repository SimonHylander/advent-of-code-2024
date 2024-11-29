#!/bin/bash

run="bun run src/$1/$1_$2.ts"

t1=$(date +%s%3N); $run; t2=$(date +%s%3N); echo "time: $((t2-t1)) ms"