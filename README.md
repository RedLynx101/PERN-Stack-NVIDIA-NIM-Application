# PERN Stack NVIDIA NIM Application

An archived March 2024 prototype by Noah Hicks, built to test NVIDIA's then-new hosted NIM chat endpoint inside a conventional PostgreSQL, Express, React, and Node.js application.

## What is implemented

- A React interface for creating, updating, selecting, and deleting model configurations.
- An Express API backed by PostgreSQL through Knex.
- A chat route that loads a selected model configuration and calls NVIDIA's `integrate.api.nvidia.com/v1/chat/completions` endpoint.
- Environment-variable configuration for database and API credentials.

## Why it remains useful

The repository is a compact record of rapid platform adoption: a newly released inference surface was connected to ordinary application state, CRUD operations, persistence, and a user-facing chat flow. It predates the stronger evaluation, governance, and deployment practices used in Noah's later AI systems, so it belongs on the portfolio as an early artifact rather than a current production reference architecture.

## Current boundary

- The project is archived and has no public hosted deployment.
- It requires a PostgreSQL database and a valid NVIDIA NIM API key.
- It has no automated backend test suite, migration layer, authentication boundary, rate limiting, or production secret-management design.
- No license is currently surfaced, so the source is publicly viewable but reuse rights are not granted by this README.

## Stack

- React and TypeScript
- Node.js and Express
- PostgreSQL and Knex
- NVIDIA NIM chat-completions API
- Axios and dotenv
