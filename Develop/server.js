const express = require('express');
const path = require('path');
const fs = require('fs');
import { v4 as generateId } from 'uuid'; // package for generating note ids

const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
