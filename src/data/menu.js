/* Menu content, kept as data so editing the menu never means editing a
 * component.
 *
 * DRAFT. Transcribed from "Misc Resources/Menu Planning.xlsx", which is still
 * being voted on - this is the full candidate list, not the confirmed menu.
 * Prune it to the agreed items before launch.
 *
 * Two deliberate omissions: supplier names from the spreadsheet (internal, not
 * customer-facing) and prices (not yet set). The deck also mentions selected
 * alcoholic drinks, which the spreadsheet does not yet list.
 */

export const menu = [
  {
    id: 'coffee',
    title: 'Coffee',
    note: 'Specialty coffee, made to order.',
    items: [
      { name: 'Double Espresso' },
      { name: 'Americano', detail: 'Espresso, water' },
      { name: 'Latte', detail: 'Espresso, milk' },
      { name: 'Mocha', detail: 'Espresso, chocolate sauce, milk, chocolate shavings' },
      { name: 'Vanilla Latte', detail: 'Espresso, vanilla syrup, milk' },
      {
        name: 'Toasted Marshmallow Latte',
        detail: 'Espresso, toasted marshmallow syrup, milk, marshmallow',
      },
      {
        name: 'Lemon Meringue Latte',
        detail: 'Espresso, lemon syrup, milk, lemon meringue, lemon zest',
      },
      {
        name: 'Crème Brûlée Latte',
        detail: 'Espresso, vanilla syrup, crème brûlée cream, sugar',
      },
      {
        name: 'Strawberry Latte',
        detail: 'Espresso, strawberry syrup, milk, dried strawberry',
      },
      {
        name: 'Salted Brown Butter Latte',
        detail: 'Espresso, brown butter syrup, sea salt, milk',
      },
      {
        name: 'Miso Caramel Latte',
        detail: 'Espresso, caramel sauce, miso, milk, sea salt flakes',
      },
      { name: 'Yuzu Espresso Tonic', detail: 'Espresso, yuzu syrup, tonic water' },
      { name: 'Peach Espresso Tonic', detail: 'Espresso, peach syrup, tonic water' },
    ],
  },
  {
    id: 'cold-brew',
    title: 'Cold Brew',
    items: [
      { name: 'Cold Brew' },
      { name: 'Cold Brew Lemonade', detail: 'Cold brew, lemonade, lemon' },
      {
        name: 'Mont Blanc',
        detail:
          'Cold brew, orange syrup, vanilla syrup, orange sweet cream, orange zest, cinnamon',
      },
      {
        name: 'Bueno Blanc',
        detail: 'Cold brew, hazelnut sweet cream, chocolate flakes',
      },
      {
        name: 'Pistachio Sweet Cream Cold Brew',
        detail: 'Cold brew, pistachio syrup, pistachio sweet cream, crushed pistachios',
      },
      {
        name: 'Toasted Coconut Sweet Cream Cold Brew',
        detail: 'Cold brew, toasted coconut syrup, sweet cream, toasted coconut flakes',
      },
      {
        name: 'Sea Salt Butterscotch Cold Brew',
        detail: 'Cold brew, butterscotch syrup, sea salt cream, butterscotch, sea salt',
      },
      {
        name: 'Honeycomb Cold Brew',
        detail: 'Cold brew, honeycomb syrup, sweet cream, honeycomb crumble',
      },
    ],
  },
  {
    id: 'matcha-hojicha',
    title: 'Matcha & Hojicha',
    items: [
      { name: 'Matcha Latte', detail: 'Matcha, milk' },
      {
        name: 'Strawberry Matcha',
        detail: 'Matcha, strawberry purée, milk, dried strawberry',
      },
      {
        name: 'Cookie Butter Matcha',
        detail: 'Matcha, cookie butter, milk, cookie butter sweet cream, crumble',
      },
      {
        name: 'Banana Bread Matcha',
        detail: 'Matcha, banana syrup, brown sugar syrup, cinnamon, milk, sweet cream',
      },
      {
        name: 'Black Sesame Matcha',
        detail: 'Matcha, black sesame paste, milk, sweet cream, black sesame powder',
      },
      {
        name: 'White Chocolate Matcha',
        detail: 'Matcha, white chocolate sauce, milk, sweet cream',
      },
      { name: 'Hojicha Latte', detail: 'Hojicha, milk' },
      {
        name: 'Strawberry Hojicha',
        detail: 'Hojicha, strawberry purée, milk, dried strawberry',
      },
      {
        name: 'Sea Salt Hojicha',
        detail: 'Hojicha, milk, sea salt cream, sea salt flakes',
      },
      {
        name: 'Miso Caramel Hojicha',
        detail: 'Hojicha, caramel sauce, miso, milk, sea salt flakes',
      },
      { name: 'Butter Peach Hojicha', detail: 'Hojicha, peach, butter, milk' },
      { name: 'Genmai Latte', detail: 'Genmai, milk' },
      { name: 'Brown Sugar Genmai', detail: 'Genmai, brown sugar syrup, milk' },
      {
        name: 'Honeycomb Genmai',
        detail: 'Genmai, honey syrup, milk, honeycomb crumble',
      },
      { name: 'Salted Honey Genmai', detail: 'Genmai, honey, milk, sea salt cream' },
    ],
  },
  {
    id: 'tea-refreshers',
    title: 'Tea & Refreshers',
    items: [
      { name: 'Honey Yuzu Fizz', detail: 'Honey, yuzu jam, soda, lemon' },
      { name: 'Strawberry Yuzu Fizz', detail: 'Strawberry purée, yuzu jam, soda' },
      {
        name: 'Grape Jasmine Fizz',
        detail: 'Jasmine green tea, white grape syrup, lemon juice, soda, grapes',
      },
      { name: 'Honey Chamomile Tea', detail: 'Chamomile tea, honey' },
      { name: 'Rose Earl Grey Tea', detail: 'Earl grey tea, rose syrup' },
      { name: 'Peach Oolong Tea', detail: 'Oolong tea, peach syrup, peach' },
      { name: 'Sparkling Water' },
      { name: 'Ginger Beer' },
    ],
  },
  {
    id: 'bites',
    title: 'Bites',
    note: 'Light bites, primarily assembly.',
    items: [
      {
        name: 'Chips',
        detail: 'Sour cream dip, chopped chives, fried shallots',
      },
      {
        name: 'Chips',
        detail: 'Jamón, mini pickles, parmesan, olive oil',
      },
      { name: 'Sweet Potato Fries' },
      { name: 'Mini Potato Fries' },
      { name: 'Mini Croffles', detail: 'Sweet cream and seasonal fruit' },
    ],
  },
  {
    id: 'sweet-bakes',
    title: 'Sweet Bakes',
    items: [
      { name: 'Almond Filled Croissant' },
      { name: 'Chocolate Hazelnut Filled Croissant' },
      { name: 'Butter Apple Turnover' },
      { name: 'Cinnamon Swirl' },
      { name: 'Kouign-amann' },
      { name: 'Dark Chocolate Brownie' },
      { name: 'Macadamia Brownie' },
      { name: 'Coffee Walnut Loaf' },
      { name: 'Madeleines' },
      { name: 'Strawberry Lattice' },
    ],
  },
  {
    id: 'savoury',
    title: 'Savoury',
    items: [
      { name: 'Chicken Pot Pie' },
      { name: 'Turkey Ham & Spinach Quiche' },
      { name: 'Smoked Salmon Quiche' },
      { name: 'Roast Chicken Wrap', detail: 'Mango chutney' },
      { name: 'Chicken Wrap', detail: 'Cumin basil pesto' },
      { name: 'Tuna Croissant', detail: 'Egg mayo' },
    ],
  },
  {
    id: 'desserts',
    title: 'Desserts',
    note: 'Served on their own, in a drink, or over a bake.',
    items: [
      {
        name: 'Ice Cream & Sorbet',
        detail:
          'Pistachio, saffron pistachio, triple chocolate, earl grey lavender, Mao Shan Wang durian, lemon sorbet',
      },
      { name: 'Burnt Cheesecake' },
      { name: 'Blueberry Cheesecake' },
      { name: 'Royal Chocolate Truffle Cake' },
      { name: 'Yuzu Osmanthus Cake' },
      { name: 'Mango Lychee Cake', detail: 'Vegan' },
    ],
  },
]
