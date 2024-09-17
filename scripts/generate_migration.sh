#!/bin/bash

# File: generate_migration.sh
# This script generates a new Prisma migration

generate_migration() {
    # Generate the migration
    npx prisma migrate dev --name "$1"

    # Get the latest migration directory
    latest_migration=$(find -d prisma/migrations/*/ | sort -r | head -n 1)

    # Convert the Prisma migration to plain SQL
    npx prisma migrate diff \
        --from-schema-datamodel prisma/schema.prisma \
        --to-schema-datamodel prisma/schema.prisma \
        --script > "${latest_migration}migration.sql"

    echo "Migration generated and converted to SQL in ${latest_migration}migration.sql"
}

# Usage: ./generate_migration.sh "migration_name"