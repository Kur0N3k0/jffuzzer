# Mem Fuzzer

FROM		ubuntu:16.04
MAINTAINER	kuroneko@nekop.kr
WORKDIR		/

# for 32-bit binary
RUN dpkg --add-architecture i386
RUN apt-get update && apt-get -y upgrade
RUN apt-get install -y libc6:i386 libncurses5:i386 libstdc++6:i386

RUN apt-get install -y gdb gcc g++ python-dev python-setuptools python-pip
RUN pip install --upgrade pip

WORKDIR	/root
CMD run.sh