#!/bin/bash

# Install dependencies
pip install -r requirements.txt

# Collect static files
python portfolio_backend/manage.py collectstatic --noinput --clear