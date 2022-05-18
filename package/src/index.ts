// import { Request, Response } from 'express'
import { renderHTML } from './renderHTML'

const express = (options) => {
    return (req, res, next) => {
      res.setHeader('Content-Type', 'text/html')
      const html = renderHTML(options)
      res.write(html)
      res.end()
    }
}

export default express;