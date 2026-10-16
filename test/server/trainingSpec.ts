/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */
import { expect } from 'chai'
import express from 'express'
import http from 'http'
import training from '../../routes/training'

describe('vulnerable training routes', () => {
  const app = express()
  app.use('/training', training)
  const server = http.createServer(app)

  before((done) => {
    server.listen(0, '127.0.0.1', done)
  })

  after((done) => {
    server.close(done)
  })

  async function request (path: string): Promise<{ status: number | undefined, headers: http.IncomingHttpHeaders, body: string }> {
    const address = server.address()
    if (address === null || typeof address === 'string') {
      throw new Error('Training test server is not listening on a TCP port.')
    }
    return await new Promise((resolve, reject) => {
      http.get({ hostname: '127.0.0.1', port: address.port, path }, (res) => {
        let body = ''
        res.setEncoding('utf8')
        res.on('data', (chunk: string) => { body += chunk })
        res.on('error', reject)
        res.on('end', () => { resolve({ status: res.statusCode, headers: res.headers, body }) })
      }).on('error', reject)
    })
  }

  it('serves an ordinary message without authentication', async () => {
    const res = await request('/training/preview?message=Hello')

    expect(res.status).to.equal(200)
    expect(res.headers['content-type']).to.include('text/html')
    expect(res.body).to.equal('<h1>Training message preview</h1><div>Hello</div>')
  })

  it('intentionally reflects executable HTML without escaping', async () => {
    const message = '<script>window.trainingDemo = true</script>'
    const res = await request('/training/preview?message=' + encodeURIComponent(message))

    expect(res.status).to.equal(200)
    expect(res.headers['content-type']).to.include('text/html')
    expect(res.body).to.include(message)
    expect(res.headers['content-security-policy']).to.equal(undefined)
  })

  for (const query of ['', '?message=one&message=two', '?message[nested]=value']) {
    it(`rejects a missing or non-string preview message: ${query}`, async () => {
      const res = await request('/training/preview' + query)

      expect(res.status).to.equal(400)
      expect(res.body).to.equal('A single message query parameter is required.')
    })
  }

  for (const destination of ['/training/preview?message=Hello', 'https://example.invalid/landing', '//example.invalid/landing']) {
    it(`intentionally redirects without an allowlist: ${destination}`, async () => {
      const res = await request('/training/redirect?to=' + encodeURIComponent(destination))

      expect(res.status).to.equal(302)
      expect(res.headers.location).to.equal(destination)
    })
  }

  for (const query of ['', '?to=', '?to=one&to=two', '?to[nested]=value']) {
    it(`rejects a missing, empty or non-string redirect destination: ${query}`, async () => {
      const res = await request('/training/redirect' + query)

      expect(res.status).to.equal(400)
      expect(res.body).to.equal('A single non-empty to query parameter is required.')
    })
  }
})
