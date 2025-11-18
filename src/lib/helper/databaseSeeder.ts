import {DataSource} from "typeorm";

export async function seedDatabase(AppDataSource: DataSource) {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        console.log("🚀 Running auto seed...");

        // --- 🌍 COUNTRIES SEED ---
        const countriesCount = await queryRunner.query(`SELECT COUNT(*)
                                                        FROM countries`);
        if (Number(countriesCount[0].count) === 0) {
            console.log("🌍 Seeding countries...");

            await queryRunner.query(`
                INSERT INTO countries (id, name, code, dial_code)
                VALUES (gen_random_uuid(), 'Indonesia', 'ID', '+62'),
                       (gen_random_uuid(), 'Malaysia', 'MY', '+60'),
                       (gen_random_uuid(), 'Singapore', 'SG', '+65'),
                       (gen_random_uuid(), 'Thailand', 'TH', '+66'),
                       (gen_random_uuid(), 'United States', 'US', '+1'),
                       (gen_random_uuid(), 'United Kingdom', 'GB', '+44');
            `);

            console.log("✅ Countries seeded successfully.");
        } else {
            console.log("✅ Countries already exist — skipping seed.");
        }

        console.log("🎉 Auto seed completed.");
    } catch (err) {
        console.error("❌ Seeder error:", err);
    } finally {
        await queryRunner.release();
    }
}