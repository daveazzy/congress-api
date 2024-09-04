# First Steps

    install and configure Docker 'https://docs.docker.com/'

    1. npm install
    2. Create and configure .env
    3. docker compose up -d
    4. npx prisma generate
    5. npx prisma migrate dev

# Register Participants
    Method: POST
    Route: /participants

    Body:
       name, email, institution, password

# Register Coordinators
    Method: POST
    Route: /coordinators

    Body:
        name, email, institution, jobTitle, password

# Register Professors
    Method: POST
    Route: /professors

    Body:
        name, email, institution, jobTitle, password