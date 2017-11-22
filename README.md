Command line interface to access the Genus version service

# Installation

```sh
npm i https://github.com/Genusbiz/version-util-cli
```

# Options

* -b, --branch [branch] 
* -d, --destination [path]
* -r, --repo [repo id] 

# Usage

```sh
$ versionutil getrepos
```
Prints a list of all available repos

```sh
$ versionutil getversion -b develop -r 24 -d versionNumber.txt
```
Will get the version number of the develop branch of the repo with id 24 and print it to the file versionNumber.txt. Usage without the -d flag will just print the version number to console.
