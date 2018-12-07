[![Build Status](https://travis-ci.com/Simplemart17/iReporter.svg?branch=develop)](https://travis-ci.com/Simplemart17/iReporter)
[![Coverage Status](https://coveralls.io/repos/github/Simplemart17/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/Simplemart17/iReporter?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/b85bc0e6ad4861d2b8ec/maintainability)](https://codeclimate.com/github/Simplemart17/iReporter/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b85bc0e6ad4861d2b8ec/test_coverage)](https://codeclimate.com/github/Simplemart17/iReporter/test_coverage)

# iReporter
This is an Andela Bootcamp Project, a Developer Challenge called iReporter

## About
iReporter is a platform which enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public.

It can also be used to report on things that needs government intervention.


# The API Endpoints Documentation

**URL**

/api/v1/record/red-flags

**Method:**

`GET/`

`POST/`

`PATCH/`

`DELETE/`

**URL Params**

`id=[integer]`

**Data Params**

_When making a POST request, the payload should be_

  {
    
    "createdBy": "String",
    
    "type": "String",
    
    "location": "String",
    
    "Images": [Image, Image ],
    
    "Video": [Image, Image],
    
    "comment": "String"
  }
  
  **Success Response:**
  
  `message: "Red-flag record added successfully"`
  
  `code: 201`
  
  `Data: [{ }]`
  
  **Error Response:**
  
  `message: "All fields required"`
  
  `code: 404`
  
  _When making a PATCH request_
  
 ` URL Params`
 
  `/:id/location`
  
 `/:id/comment`
  
  **Success Response:**
  
 `message: "Red-flag location/comment updated successfully"`
 
  `code: 201`
  
  `Data: [{ }]`
  
  **Error Response:**
  
  `message: "The record is not found"`
  
  `code: 404`
  
  `message: "The field is required"`
  
  `code: 400`
  


