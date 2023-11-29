import sandbox from '@architect/sandbox'
import AWS from '@aws-lite/client'
import test from 'node:test'
import assert from 'node:assert'

const TableName = 'testapp-production-data'

const aws = await AWS({
  protocol: 'http', 
  host: 'localhost', 
  port: 4255,
  region: 'us-west-2'
})

test('start', async t => {
  return sandbox.start({quiet: true})
})

test('list tables', async t => {
  const result = await aws.DynamoDB.ListTables()
  assert(result.TableNames.length === 2)
})

test('write a row', async t => {
  return aws.DynamoDB.PutItem({
    TableName,
    Item: {
      pk: 'hi',
      hello: true
    }
  })
})

test('read a row', async t => {
  let result = await aws.DynamoDB.GetItem({
    TableName,
    Key: {
      pk: 'hi',
    }
  })
  console.log(result.Item)
})

test('destroy a row', async t => {
  let result = await aws.DynamoDB.DeleteItem({
    TableName,
    Key: {
      pk: 'hi',
    }
  })
})

test('end', async t => {
  return sandbox.end()
})
