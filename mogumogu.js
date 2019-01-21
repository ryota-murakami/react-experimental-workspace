#!/usr/bin/env node
const chalk = require('chalk')

const mogumogu = ['チョコレート', 'カツ丼', 'いきなりステーキ']

console.log('Ininial Mogumogu: ' + mogumogu.toString())
console.log('\n\n')

const eat = food => {
  return 'eated'
}

// @TODO アウトプット「After Mogumogu: ,,」ってなんやねん(´・ω・｀)
console.log(
  chalk.green(
    'After Mogumogu: ' +
      mogumogu
        .map(food => {
          food = 'eated'
        })
        .toString()
  )
)
