# Basic Expressions

Type a dice expression in the box above to roll.

[`d`](#/d/d) rolls one six-sided die. You can also write [`d6`](#/d/d6) or [`1d6`](#/d/1d6). Roll multiple dice with [`3d6`](#/d/3d6), use different sizes with [`2d10`](#/d/2d10), or roll a percent die with [`d100`](#/d/d100) (or [`d%`](#/d/d%)).

# Custom Dice and Fate Dice

Define dice with custom face values: [`d{1,1,2,2,3,4}`](#/d/d%7B1,1,2,2,3,4%7D). Useful for non-standard dice or weighted distributions.

[`dF`](#/d/dF) is a Fate/Fudge die with faces -1, 0, and 1. Roll multiple with [`4dF`](#/d/4dF). Custom dice work with all modifiers: [`4dF keep 2`](#/d/4dF_keep_2), [`d{1,2,3} + 5`](#/d/d%7B1,2,3%7D_+_5).

# Math

Combine dice with arithmetic: [`3d6+4-1d4`](#/d/3d6+4-1d4). Division truncates to integers: [`5d6/2`](#/d/5d6/2). Standard operator precedence applies (multiplication and division before addition and subtraction).

Division: `/`, `÷`, or `:`. Multiplication: `*`, `×`, `⋅`, or `x`.

# Expression Sets and Reducing

Group multiple expressions in a set: [`(2d6,3d8,1d10+2)`](#/d/(2d6,3d8,1d10+2)). By default, results are summed. Other reducers:

* [`sum`](#/d/(2d6,3d8,1d10+2)_sum) (default)
* [`min`](#/d/(2d6,3d8,1d10+2)_min) or `take least` -- lowest value
* [`max`](#/d/(2d6,3d8,1d10+2)_max) or `take best` -- highest value
* [`median`](#/d/(2d6,3d8,1d10+2)_median) -- middle value
* [`average`](#/d/(2d6,3d8,1d10+2)_average) -- mean, rounded

Sets also control operator precedence: [`(3d6+2) x 2`](#/d/(3d6+2)_x_2). They compose with other features: [`((3d6,9) keep 1 + 2) * 2`][1].

# Filtering: Drop and Keep

Remove or retain dice from a set by rank.

**Drop** removes the lowest N values by default:

* [`4d6 drop 1`](#/d/4d6_drop_1) -- drop the lowest die (classic D&D ability score roll)
* [`4d6 drop lowest 1`](#/d/4d6_drop_lowest_1) -- same, explicit
* [`4d6 drop highest 1`](#/d/4d6_drop_highest_1) -- drop the highest instead

**Keep** retains the highest N values by default:

* [`4d6 keep 3`](#/d/4d6_keep_3) -- equivalent to `drop 1`
* [`4d6 keep highest 3`](#/d/4d6_keep_highest_3) -- same, explicit
* [`4d6 keep lowest 1`](#/d/4d6_keep_lowest_1) -- keep only the lowest

Shorthands: [`4d6d1`](#/d/4d6d1) for drop, [`4d6k3`](#/d/4d6k3) for keep.

# Dice Sets

A dice set like [`5d6`](#/d/5d6) expands into individual dice [`(d6,d6,d6,d6,d6)`](#/d/(d6,d6,d6,d6,d6)). Dice sets support special modifiers: *explode*, *reroll*, *compound*, and *emphasis*. Sets can mix denominations: [`(d2,d4,d6,d8,d10)`](#/d/(d2,d4,d6,d8,d10)).

Note: [`(d6,2d8)`](#/d/(d6,2d8)) is an expression set, not a dice set, because `2d8` is itself an expression. Expression sets support reducing and filtering but not dice-specific modifiers.

# Explode

An exploding die is rolled again whenever it hits a trigger value. All rolls are summed as separate dice. [`3d6 explode always on 5 or more`](#/d/3d6_explode_always_on_5_or_more) or shorthand [`3d6e5`](#/d/3d6e5).

Limit explosions with [`once`](#/d/3d6_explode_once_on_5_or_more), [`twice`](#/d/3d6_explode_twice_on_5_or_more), [`thrice`](#/d/3d6_explode_thrice_on_5_or_more), or [`N times`](#/d/3d6_explode_10_times_on_5_or_more). The trigger can be `or more`, `or less`, or an exact value.

# Reroll

Same syntax as explode, but keeps only the last roll instead of summing all: [`3d6 reroll always on 2 or less`](#/d/3d6_reroll_always_on_2_or_less) or shorthand [`3d6r2`](#/d/3d6r2).

# Compound

Like explode, but the extra rolls are added to the *original* die rather than producing new dice. A die that rolled 6 and then 4 shows as a single die worth 10.

[`d6 compound on 6`](#/d/d6_compound_on_6) or shorthand [`3d6ce6`](#/d/3d6ce6). Supports the same time limits: [`d6 compound once on 6`](#/d/d6_compound_once_on_6), [`d6 compound twice on 6`](#/d/d6_compound_twice_on_6), etc.

# Emphasis

[Rolling With Emphasis](https://homebrewery.naturalcrit.com/share/wyL-vuEIDrbC) is a mechanic by Brennan Lee Mulligan: roll two dice and take the result furthest from the average. This increases the chance of extreme results (natural 1 or max).

* [`d20 emphasis`](#/d/d20_emphasis) -- ties resolved by rerolling
* [`d20 emphasis high`](#/d/d20_emphasis_high) -- ties go to the higher value
* [`d20 emphasis low`](#/d/d20_emphasis_low) -- ties go to the lower value

You can specify a custom center point instead of the average: [`d20 furthest from 8`](#/d/d20_furthest_from_8), with optional [`high`](#/d/d20_furthest_from_8_high), [`low`](#/d/d20_furthest_from_8_low), or [`reroll`](#/d/d20_furthest_from_8_reroll) tie-breakers.

# Dice Pools

Count how many dice meet a threshold, for systems like World of Darkness or Shadowrun.

* [`8d10 count >= 6`](#/d/8d10_count_>=_6) -- count successes rolling 6 or higher
* [`3d6 count = 5`](#/d/3d6_count_=_5) -- count exact matches
* [`4d6 count <= 2`](#/d/4d6_count_<=_2) -- count values at or below 2
* [`4d6 count > 4`](#/d/4d6_count_>_4) and [`4d6 count < 3`](#/d/4d6_count_<_3) -- strict comparisons

Shorthand: [`8d10c6`](#/d/8d10c6) for `count >= 6`.

Dice pools compose with other modifiers: [`8d10 explode on 10 count >= 6`](#/d/8d10_explode_on_10_count_>=_6).

  [1]: #/d/((3d6,9)_keep_1_+_2)_*_2
