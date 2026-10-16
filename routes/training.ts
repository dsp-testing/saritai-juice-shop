/*
 * Copyright (c) 2014-2023 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */
import express from 'express'

const router = express.Router()

// Intentionally vulnerable training routes. Never use with real users or data.
router.get('/preview', (req, res) => {
  const message = req.query.message
  if (typeof message !== 'string') {
    res.status(400).send('A single message query parameter is required.')
    return
  }

  res.type('html').send(`<h1>Training message preview</h1><div>${message}</div>`)
})

router.get('/redirect', (req, res) => {
  const destination = req.query.to
  if (typeof destination !== 'string' || destination.length === 0) {
    res.status(400).send('A single non-empty to query parameter is required.')
    return
  }

  res.redirect(destination)
})

export default router
