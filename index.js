#!/usr/bin/env node
const request = require('request')
const program = require('commander')
const fs = require('fs')


const getVersionNumber = require('version-util').getVersionNumber
const incrementVersionNumber = require('version-util').incrementVersionNumber
const checkBranch = require('version-util').checkBranch
const getRepos = require('version-util').getRepos


program
	.version('1.0.0')
	.option('-b, --branch [branch]', 'Git branch')
	.option('-d, --destination [path]', 'Destination')
	.option('-r, --repo [repo id], Repo Id')

program
	.command('getrepos')
	.description('Gets a list of all repos')
	.action((cmd, options) => {
		console.log("Gets a list of all repos")

		getRepos()
			.then(repos => {

				repos.forEach(repo => {

					console.log(`	
	Name:         ${repo.name}
	Description:  ${repo.description}
	Id:           ${repo.id}`)
				})
			})
	})

program
	.command('getversion')
	.description('Gets the version number')
	.action((cmd, options) => {
		console.log("Gets the version number")

		let branch = program.branch || process.env.CI_COMMIT_REF_NAME
		let repoId = program.repo || process.env.CI_PROJECT_ID

		checkBranch(repoId, branch)
			.then(getVersionNumber)
			.then(function (version) {

				if (program.destination) {
					fs.writeFile(program.destination, version, function (err) {
						if (err) {
							throw err
						}
						console.log("Versionnumber saved in " + program.destination)
					})
				} else {

					console.log(version)
				}
			})
			.catch(function (err) {
				console.error("ERROR: " + err)
			})
	})

program
	.command('incrementversion')
	.description('Increments version number and gets the new version number')
	.action((cmd, options) => {
		console.log("Increments the version number")

		let branch = program.branch || process.env.CI_COMMIT_REF_NAME
		let repoId = program.repo || process.env.CI_PROJECT_ID

		checkBranch(repoId, branch)
			.then(incrementVersionNumber)
			.then(function (version) {

				if (program.destination) {
					fs.writeFile(program.destination, version, function (err) {
						if (err) {
							throw err
						}
						console.log("Versionnumber saved in " + program.destination)
					})
				} else {

					console.log(version)
				}
			})
			.catch(function (err) {
				console.error("ERROR: " + err)
			})
	})

program.parse(process.argv)