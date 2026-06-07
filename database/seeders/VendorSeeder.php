<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\MenuItem;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class VendorSeeder extends Seeder
{
    // Helper to build a clean Unsplash image URL
    private function img(string $photoId): string
    {
        return "https://images.unsplash.com/photo-{$photoId}?auto=format&fit=crop&w=600&q=80";
    }

    public function run(): void
    {
        // ── Image IDs keyed by food type ───────────────────────────────────────
        $imgs = [
            'jollof'          => $this->img('1604328727766-a151d1045ab4'),  // jollof rice
            'fried_rice'      => $this->img('1603133872878-684f208fb84b'),  // fried rice
            'egusi_soup'      => $this->img('1547592180-85f173990554'),     // soup bowl
            'pounded_yam'     => $this->img('1604329760661-e71dc83f8f26'), // swallow & soup
            'okra_soup'       => $this->img('1547592180-85f173990554'),     // soup bowl
            'burger'          => $this->img('1568901346375-23c9450c58cd'),  // burger
            'fries'           => $this->img('1576107232684-1279f261dbaa'), // fries
            'chicken_burger'  => $this->img('1553979459-d1ala84b5f12'),    // crispy chicken burger — fallback
            'orange_juice'    => $this->img('1613478223719-2ab802602423'), // orange juice glass
            'pizza'           => $this->img('1565299624946-b28f40a0ae38'), // pizza
            'bbq_pizza'       => $this->img('1513104890138-7c749659a591'), // bbq pizza
            'veggie_pizza'    => $this->img('1571997478705-936a68d78438'), // veggie pizza
            'smoothie'        => $this->img('1553530666-ba11a7da3888'),    // tropical smoothie
            'shawarma'        => $this->img('1565557623262-b51c2513a641'), // shawarma wrap
            'chapman'         => $this->img('1544145945-f90425340c7e'),    // cocktail drink
            'suya'            => $this->img('1544025162-d76538b2a507'),    // meat skewers
            'zobo'            => $this->img('1497534446932-1d1a7820b6ca'), // red hibiscus drink
            'mango_smoothie'  => $this->img('1546173159-315724a31696'),    // mango smoothie
            'green_smoothie'  => $this->img('1610970881699-44a5587cabec'), // green smoothie
            'berry_smoothie'  => $this->img('1553530666-ba11a7da3888'),    // berry/pink smoothie
            'pineapple_juice' => $this->img('1587049352851-8d4b89133611'), // pineapple juice
            'watermelon'      => $this->img('1587049352846-4a222e784d38'), // watermelon juice
            'spring_rolls'    => $this->img('1563245372-f21724e3856d'),    // spring rolls
            'puff_puff'       => $this->img('1551024601-bec78aea704b'),    // fried dough balls
            'samosa'          => $this->img('1601050690597-df0568f70950'), // samosa
            'fried_yam'       => $this->img('1606923829579-0cb981a83e2e'), // yam fries
            'plantain_beans'  => $this->img('1518977956812-cd3dbadaaf31'), // fried plantain
            'coconut_rice'    => $this->img('1604328727766-a151d1045ab4'), // rice dish
            'white_rice'      => $this->img('1536304929831-ee1ca9d44906'), // white rice & stew
            'ofada_rice'      => $this->img('1604328727766-a151d1045ab4'), // rice dish
            'grilled_chicken' => $this->img('1527477396000-e27163b481c2'), // grilled chicken
            'fried_fish'      => $this->img('1504674900247-0877df9cc836'), // fried fish
            'noodles'         => $this->img('1569718212165-3a8278d5f624'), // stir fry noodles
            'spaghetti'       => $this->img('1473093295043-cdd812d0e501'), // spaghetti
            'noodle_soup'     => $this->img('1547592166-23ac45744acd'),    // noodle soup bowl
            'boiled_egg'      => $this->img('1482049016688-2d3e1b311543'), // boiled eggs
            'hot_chocolate'   => $this->img('1542990253-0d0f5be5f0ed'),    // milo / hot choc
            'bbq_chicken'     => $this->img('1555939594-58d7cb561ad1'),    // BBQ chicken
            'beef_ribs'       => $this->img('1544025162-d76538b2a507'),    // ribs on grill
            'mixed_grill'     => $this->img('1558030006-b12f75ab0a50'),    // mixed grill platter
            'lemon_juice'     => $this->img('1621506289937-a8e4df240d0b'), // lemon drink
        ];

        // ── Vendor data ────────────────────────────────────────────────────────
        $vendors = [
            // 1. Mama Titi's Kitchen
            [
                'user'   => ['name' => 'Mama Titi', 'email' => 'mamatiti@quickbite.com', 'password' => Hash::make('password'), 'role' => 'vendor'],
                'vendor' => ['name' => "Mama Titi's Kitchen", 'description' => 'Authentic Nigerian home cooking — jollof rice, egusi soup, and more, made fresh daily.', 'is_open' => true],
                'categories' => [
                    [
                        'name'  => 'Rice Dishes',
                        'items' => [
                            ['name' => 'Spicy Jollof Rice',    'description' => 'Party-style jollof rice cooked over firewood with assorted proteins.',          'price' => 1800, 'image_url' => $imgs['jollof'],     'preparation_time' => 15],
                            ['name' => 'Fried Rice & Chicken', 'description' => 'Special fried rice with mixed vegetables served with a full chicken leg.',       'price' => 2200, 'image_url' => $imgs['fried_rice'], 'preparation_time' => 15],
                        ],
                    ],
                    [
                        'name'  => 'Soups & Swallow',
                        'items' => [
                            ['name' => 'Egusi Soup + Eba',         'description' => 'Rich egusi soup with stockfish and assorted meat, served with eba.',       'price' => 2500, 'image_url' => $imgs['egusi_soup'],  'preparation_time' => 20],
                            ['name' => 'Okra Soup + Pounded Yam',  'description' => 'Freshly pounded yam with draw okra soup and beef.',                         'price' => 2800, 'image_url' => $imgs['pounded_yam'], 'preparation_time' => 20],
                        ],
                    ],
                ],
            ],

            // 2. Burger Boss
            [
                'user'   => ['name' => 'Burger Boss', 'email' => 'burgerboss@quickbite.com', 'password' => Hash::make('password'), 'role' => 'vendor'],
                'vendor' => ['name' => 'Burger Boss', 'description' => 'Premium handcrafted burgers, hot dogs, and loaded fries for the serious campus foodie.', 'is_open' => true],
                'categories' => [
                    [
                        'name'  => 'Burgers',
                        'items' => [
                            ['name' => 'Classic Beef Burger',    'description' => 'Juicy beef patty with lettuce, tomato, pickles, and signature sauce.',              'price' => 3500, 'image_url' => $imgs['burger'],         'preparation_time' => 12],
                            ['name' => 'Double Smash Burger',    'description' => 'Two smashed beef patties with melted cheddar and caramelized onions.',              'price' => 4500, 'image_url' => $imgs['burger'],         'preparation_time' => 15],
                            ['name' => 'Crispy Chicken Burger',  'description' => 'Crunchy fried chicken fillet with coleslaw and honey mustard.',                     'price' => 3800, 'image_url' => $imgs['grilled_chicken'], 'preparation_time' => 15],
                        ],
                    ],
                    [
                        'name'  => 'Sides & Drinks',
                        'items' => [
                            ['name' => 'Loaded Fries',        'description' => 'Crispy fries topped with cheese sauce, jalapeños, and sour cream.',   'price' => 1500, 'image_url' => $imgs['fries'],        'preparation_time' => 10],
                            ['name' => 'Fresh Orange Juice',  'description' => 'Cold-pressed fresh orange juice, no sugar added.',                     'price' => 800,  'image_url' => $imgs['orange_juice'], 'preparation_time' => 5],
                        ],
                    ],
                ],
            ],

            // 3. Pizza Palace
            [
                'user'   => ['name' => 'Pizza Palace', 'email' => 'pizzapalace@quickbite.com', 'password' => Hash::make('password'), 'role' => 'vendor'],
                'vendor' => ['name' => 'Pizza Palace', 'description' => 'Wood-fired style pizzas baked to perfection — student portions at affordable prices.', 'is_open' => true],
                'categories' => [
                    [
                        'name'  => 'Pizzas',
                        'items' => [
                            ['name' => 'Pepperoni Pizza',   'description' => 'Classic marinara, mozzarella, and generous pepperoni slices.',             'price' => 4000, 'image_url' => $imgs['pizza'],       'preparation_time' => 20],
                            ['name' => 'BBQ Chicken Pizza', 'description' => 'Smoky BBQ sauce, grilled chicken, red onions, and mozzarella.',            'price' => 4200, 'image_url' => $imgs['bbq_pizza'],   'preparation_time' => 20],
                            ['name' => 'Veggie Supreme',    'description' => 'Fresh bell peppers, mushrooms, olives, and tomatoes on a thick crust.',    'price' => 3500, 'image_url' => $imgs['veggie_pizza'], 'preparation_time' => 18],
                        ],
                    ],
                    [
                        'name'  => 'Beverages',
                        'items' => [
                            ['name' => 'Tropical Smoothie', 'description' => 'Blended mango, pineapple, and banana with a hint of ginger.', 'price' => 1200, 'image_url' => $imgs['smoothie'], 'preparation_time' => 5],
                        ],
                    ],
                ],
            ],

            // 4. Shawarma House
            [
                'user'   => ['name' => 'Shawarma House', 'email' => 'shawarmahouse@quickbite.com', 'password' => Hash::make('password'), 'role' => 'vendor'],
                'vendor' => ['name' => 'Shawarma House', 'description' => 'The best campus shawarma — stuffed with grilled meat, fresh veggies, and signature garlic sauce.', 'is_open' => true],
                'categories' => [
                    [
                        'name'  => 'Shawarma',
                        'items' => [
                            ['name' => 'Chicken Shawarma',       'description' => 'Grilled chicken strips with coleslaw, tomatoes, and garlic mayo in a warm wrap.',   'price' => 2000, 'image_url' => $imgs['shawarma'], 'preparation_time' => 10],
                            ['name' => 'Beef Shawarma',          'description' => 'Seasoned beef strips with onions, peppers, and spicy sauce in a soft tortilla.',    'price' => 2500, 'image_url' => $imgs['shawarma'], 'preparation_time' => 10],
                            ['name' => 'Shawarma Combo (2 pcs)', 'description' => 'Two chicken shawarma wraps with a side of dipping sauce — best value on campus.',  'price' => 3500, 'image_url' => $imgs['shawarma'], 'preparation_time' => 15],
                        ],
                    ],
                    [
                        'name'  => 'Drinks',
                        'items' => [
                            ['name' => 'Chapman Cocktail', 'description' => 'Nigerian classic non-alcoholic cocktail with Fanta, Sprite, grenadine, and cucumber.', 'price' => 900, 'image_url' => $imgs['chapman'], 'preparation_time' => 5],
                        ],
                    ],
                ],
            ],

            // 5. Suya Spot
            [
                'user'   => ['name' => 'Suya Spot', 'email' => 'suyaspot@quickbite.com', 'password' => Hash::make('password'), 'role' => 'vendor'],
                'vendor' => ['name' => 'Suya Spot', 'description' => 'Authentic Northern-style suya — spiced beef skewers grilled over open fire. A campus legend.', 'is_open' => true],
                'categories' => [
                    [
                        'name'  => 'Suya & Grills',
                        'items' => [
                            ['name' => 'Beef Suya (5 sticks)',    'description' => 'Thinly sliced beef skewers marinated in suya spice and grilled to perfection.',    'price' => 1500, 'image_url' => $imgs['suya'], 'preparation_time' => 15],
                            ['name' => 'Chicken Suya (5 sticks)', 'description' => 'Juicy chicken suya sticks with onions and tomatoes on the side.',                  'price' => 1800, 'image_url' => $imgs['suya'], 'preparation_time' => 15],
                            ['name' => 'Suya + Jollof Combo',     'description' => 'A generous portion of suya paired with a full plate of smoky jollof rice.',        'price' => 3000, 'image_url' => $imgs['suya'], 'preparation_time' => 20],
                        ],
                    ],
                    [
                        'name'  => 'Drinks',
                        'items' => [
                            ['name' => 'Zobo Drink (Large)', 'description' => 'Chilled hibiscus drink with ginger and a hint of pineapple flavour.', 'price' => 600, 'image_url' => $imgs['zobo'], 'preparation_time' => 3],
                        ],
                    ],
                ],
            ],

            // 6. The Smoothie Bar
            [
                'user'   => ['name' => 'Smoothie Bar', 'email' => 'smoothiebar@quickbite.com', 'password' => Hash::make('password'), 'role' => 'vendor'],
                'vendor' => ['name' => 'The Smoothie Bar', 'description' => 'Fresh blended smoothies, cold juices, and healthy bites — the perfect study fuel.', 'is_open' => true],
                'categories' => [
                    [
                        'name'  => 'Smoothies',
                        'items' => [
                            ['name' => 'Mango Madness', 'description' => 'Fresh mango, banana, and coconut milk blended smooth and cold.',        'price' => 1200, 'image_url' => $imgs['mango_smoothie'], 'preparation_time' => 5],
                            ['name' => 'Green Power',   'description' => 'Spinach, cucumber, apple, and ginger — a healthy green boost.',         'price' => 1300, 'image_url' => $imgs['green_smoothie'], 'preparation_time' => 5],
                            ['name' => 'Berry Blast',   'description' => 'Strawberry, watermelon, and orange blended with a touch of honey.',    'price' => 1400, 'image_url' => $imgs['berry_smoothie'], 'preparation_time' => 5],
                        ],
                    ],
                    [
                        'name'  => 'Juices',
                        'items' => [
                            ['name' => 'Fresh Pineapple Juice', 'description' => 'Freshly squeezed pineapple juice, lightly chilled.',                 'price' => 900, 'image_url' => $imgs['pineapple_juice'], 'preparation_time' => 5],
                            ['name' => 'Watermelon Juice',      'description' => 'Pure blended watermelon juice, ice cold and refreshing.',           'price' => 800, 'image_url' => $imgs['watermelon'],      'preparation_time' => 5],
                        ],
                    ],
                ],
            ],

            // 7. Campus Chops
            [
                'user'   => ['name' => 'Campus Chops', 'email' => 'campuschops@quickbite.com', 'password' => Hash::make('password'), 'role' => 'vendor'],
                'vendor' => ['name' => 'Campus Chops', 'description' => 'Quick bites and snacks — from spring rolls to fried yam, perfect between lectures.', 'is_open' => true],
                'categories' => [
                    [
                        'name'  => 'Small Chops',
                        'items' => [
                            ['name' => 'Spring Rolls (6 pcs)',  'description' => 'Crispy fried spring rolls stuffed with seasoned vegetables and minced meat.',       'price' => 1200, 'image_url' => $imgs['spring_rolls'], 'preparation_time' => 10],
                            ['name' => 'Puff Puff (8 pcs)',     'description' => 'Soft, sweet fried dough balls — the ultimate Nigerian snack.',                       'price' => 600,  'image_url' => $imgs['puff_puff'],    'preparation_time' => 8],
                            ['name' => 'Samosa (4 pcs)',        'description' => 'Crispy pastry pockets stuffed with spiced potato and beef filling.',                 'price' => 900,  'image_url' => $imgs['samosa'],       'preparation_time' => 10],
                        ],
                    ],
                    [
                        'name'  => 'Fried Foods',
                        'items' => [
                            ['name' => 'Fried Yam & Egg Sauce', 'description' => 'Golden fried yam chips served with a spicy tomato and egg sauce.',                  'price' => 1000, 'image_url' => $imgs['fried_yam'],      'preparation_time' => 12],
                            ['name' => 'Plantain & Beans',      'description' => 'Sweet fried plantain served with a bowl of seasoned beans porridge.',                'price' => 1500, 'image_url' => $imgs['plantain_beans'], 'preparation_time' => 15],
                        ],
                    ],
                ],
            ],

            // 8. Rice Republic
            [
                'user'   => ['name' => 'Rice Republic', 'email' => 'ricerepublic@quickbite.com', 'password' => Hash::make('password'), 'role' => 'vendor'],
                'vendor' => ['name' => 'Rice Republic', 'description' => 'Everything rice — jollof, fried, coconut, white. Student-friendly portions and prices.', 'is_open' => true],
                'categories' => [
                    [
                        'name'  => 'Rice Varieties',
                        'items' => [
                            ['name' => 'Coconut Rice',         'description' => 'Fragrant coconut rice cooked with peppers and prawns.',                               'price' => 2000, 'image_url' => $imgs['coconut_rice'], 'preparation_time' => 15],
                            ['name' => 'White Rice & Stew',    'description' => 'Fluffy white rice served with rich tomato stew and fried beef.',                      'price' => 1600, 'image_url' => $imgs['white_rice'],  'preparation_time' => 10],
                            ['name' => 'Ofada Rice & Ayamase', 'description' => 'Local Nigerian ofada rice with the popular ayamase (green pepper) stew.',             'price' => 2500, 'image_url' => $imgs['ofada_rice'],  'preparation_time' => 15],
                        ],
                    ],
                    [
                        'name'  => 'Proteins',
                        'items' => [
                            ['name' => 'Grilled Chicken Leg',  'description' => 'A full grilled chicken leg with peppers and onions.',                                 'price' => 1800, 'image_url' => $imgs['grilled_chicken'], 'preparation_time' => 10],
                            ['name' => 'Fried Fish (Whole)',    'description' => 'Crispy whole fried tilapia seasoned with local spices.',                             'price' => 2000, 'image_url' => $imgs['fried_fish'],      'preparation_time' => 15],
                        ],
                    ],
                ],
            ],

            // 9. Noodle Hub
            [
                'user'   => ['name' => 'Noodle Hub', 'email' => 'noodlehub@quickbite.com', 'password' => Hash::make('password'), 'role' => 'vendor'],
                'vendor' => ['name' => 'Noodle Hub', 'description' => 'Indomie noodles, spaghetti, and stir-fry specials cooked up fresh every order.', 'is_open' => true],
                'categories' => [
                    [
                        'name'  => 'Noodles',
                        'items' => [
                            ['name' => 'Stir-Fry Indomie (Special)', 'description' => 'Two packets of indomie stir-fried with egg, veggies, and seasoned chicken.',     'price' => 1500, 'image_url' => $imgs['noodles'],     'preparation_time' => 10],
                            ['name' => 'Spaghetti Bolognese',        'description' => 'Al dente spaghetti with a rich minced beef tomato sauce.',                        'price' => 2000, 'image_url' => $imgs['spaghetti'],    'preparation_time' => 15],
                            ['name' => 'Spicy Noodle Soup',          'description' => 'Hot and spicy noodle soup with boiled egg and vegetables.',                       'price' => 1800, 'image_url' => $imgs['noodle_soup'],  'preparation_time' => 12],
                        ],
                    ],
                    [
                        'name'  => 'Add-ons',
                        'items' => [
                            ['name' => 'Boiled Eggs (2 pcs)',    'description' => 'Fresh boiled eggs seasoned with a pinch of pepper.',          'price' => 400, 'image_url' => $imgs['boiled_egg'],    'preparation_time' => 5],
                            ['name' => 'Milo / Hot Chocolate',   'description' => 'A warm mug of Milo or hot chocolate to keep you going.',      'price' => 600, 'image_url' => $imgs['hot_chocolate'], 'preparation_time' => 5],
                        ],
                    ],
                ],
            ],

            // 10. Grill & Chill
            [
                'user'   => ['name' => 'Grill & Chill', 'email' => 'grillandchill@quickbite.com', 'password' => Hash::make('password'), 'role' => 'vendor'],
                'vendor' => ['name' => 'Grill & Chill', 'description' => 'BBQ grills, cold drinks, and campus vibes — where students come to eat and unwind.', 'is_open' => true],
                'categories' => [
                    [
                        'name'  => 'BBQ & Grills',
                        'items' => [
                            ['name' => 'BBQ Chicken (Half)',     'description' => 'Half chicken marinated in smoky BBQ sauce and grilled over charcoal.',         'price' => 3500, 'image_url' => $imgs['bbq_chicken'], 'preparation_time' => 25],
                            ['name' => 'Grilled Beef Ribs',      'description' => 'Tender beef ribs slow-cooked with a tangy pepper marinade.',                  'price' => 4000, 'image_url' => $imgs['beef_ribs'],   'preparation_time' => 30],
                            ['name' => 'Mixed Grill Platter',    'description' => 'A combination of grilled chicken, beef, and sausages served with fries.',     'price' => 5500, 'image_url' => $imgs['mixed_grill'], 'preparation_time' => 30],
                        ],
                    ],
                    [
                        'name'  => 'Cold Drinks',
                        'items' => [
                            ['name' => 'Chilled Smoothie',   'description' => 'Freshly blended tropical smoothie served ice cold.',     'price' => 1000, 'image_url' => $imgs['smoothie'],    'preparation_time' => 5],
                            ['name' => 'Iced Lemon Juice',   'description' => 'Freshly squeezed lemon juice with honey and ice.',       'price' => 700,  'image_url' => $imgs['lemon_juice'], 'preparation_time' => 5],
                        ],
                    ],
                ],
            ],
        ];

        // ── Vendor emails seeded by this seeder ────────────────────────────────
        $vendorEmails = array_column(array_column($vendors, 'user'), 'email');

        // Clean up previously seeded vendor data so we can re-seed cleanly
        $existingUserIds = User::whereIn('email', $vendorEmails)->pluck('id');
        Vendor::whereIn('user_id', $existingUserIds)->delete();
        User::whereIn('email', $vendorEmails)->delete();

        // ── Insert fresh data ──────────────────────────────────────────────────
        foreach ($vendors as $vendorData) {
            $user = User::create($vendorData['user']);

            $vendor = Vendor::create([
                'user_id'     => $user->id,
                'name'        => $vendorData['vendor']['name'],
                'description' => $vendorData['vendor']['description'],
                'is_open'     => $vendorData['vendor']['is_open'],
            ]);

            foreach ($vendorData['categories'] as $categoryData) {
                $category = Category::create([
                    'vendor_id' => $vendor->id,
                    'name'      => $categoryData['name'],
                ]);

                foreach ($categoryData['items'] as $item) {
                    MenuItem::create([
                        'category_id'      => $category->id,
                        'name'             => $item['name'],
                        'description'      => $item['description'],
                        'price'            => $item['price'],
                        'image_url'        => $item['image_url'],
                        'is_available'     => true,
                        'preparation_time' => $item['preparation_time'],
                    ]);
                }
            }
        }
    }
}
