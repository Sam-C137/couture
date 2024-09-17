# This script applies the latest migration to Turso

apply_migration() {
    # Get the latest migration SQL file
    latest_migration=$(find -d prisma/migrations/*/ | sort -r | head -n 1)
    migration_file="${latest_migration}migration.sql"

    # Apply the migration to Turso
    turso db shell couture-db < "$migration_file"

    echo "Applied migration from $migration_file to Turso database"
}

# Usage: ./apply_migration.sh