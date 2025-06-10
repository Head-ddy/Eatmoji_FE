#!/bin/sh

# 현재 위치는 eatmoji 디렉토리 내부이므로 상위 디렉토리로 이동
cd ..

# 기존 output 디렉토리 제거 (있다면)
rm -rf output

# output 디렉토리 생성
mkdir output

# eatmoji 디렉토리만 복사
cp -R eatmoji/. output/
