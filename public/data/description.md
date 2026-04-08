# Basic Expressions

Type a dice expression in the box above to roll. Click the result to re-roll.

[`d`](#/d/d) rolls one six-sided die. You can also write [`d6`](#/d/d6) or [`1d6`](#/d/1d6). Roll multiple dice with [`3d6`](#/d/3d6), use different sizes with [`2d10`](#/d/2d10), or roll a percent die with [`d100`](#/d/d100) (or [`d%`](#/d/d%)).

Negative values and negated dice are supported: [`-3`](#/d/-3), [`-d6`](#/d/-d6), [`-(d6,d4)`](#/d/-(d6,d4)).

# Custom Dice and Fate Dice

Define dice with custom face values: [`d{1,1,2,2,3,4}`](#/d/d%7B1,1,2,2,3,4%7D). Useful for non-standard dice or weighted distributions.

[`dF`](#/d/dF) is a Fate/Fudge die with faces -1, 0, and 1. Roll multiple with [`4dF`](#/d/4dF). Custom dice work with all modifiers: [`4dF keep 2`](#/d/4dF_keep_2), [`d{1,2,3} + 5`](#/d/d%7B1,2,3%7D_+_5).

# Math

Combine dice with arithmetic: [`3d6+4-1d4`](#/d/3d6+4-1d4). Division truncates to integers: [`5d6/2`](#/d/5d6/2). Standard operator precedence applies (multiplication and division before addition and subtraction).

Division: `/`, `÷`, or `:`. Multiplication: `*`, `×`, `⋅`, or `x`.

# Expression Sets and Reducing

Group multiple expressions in a set: [`(2d6,3d8,1d10+2)`](#/d/(2d6,3d8,1d10+2)). By default, results are summed. Other reducers:

* [`(2d6,3d8,1d10+2) sum`](#/d/(2d6,3d8,1d10+2)_sum) (default)
* [`(2d6,3d8,1d10+2) min`](#/d/(2d6,3d8,1d10+2)_min) or `take least` -- lowest value
* [`(2d6,3d8,1d10+2) max`](#/d/(2d6,3d8,1d10+2)_max) or `take best` -- highest value
* [`(2d6,3d8,1d10+2) median`](#/d/(2d6,3d8,1d10+2)_median) -- middle value
* [`(2d6,3d8,1d10+2) average`](#/d/(2d6,3d8,1d10+2)_average) -- mean, rounded

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

# Trigger Conditions

Explode, reroll, and compound all use trigger conditions to decide when to activate. These conditions can be:

* **Exact value**: [`d6 explode once on 6`](#/d/d6_explode_once_on_6) -- triggers only on 6
* **At or above**: [`d6 explode once on 5 or more`](#/d/d6_explode_once_on_5_or_more) -- triggers on 5 or 6
* **At or below**: [`d6 reroll once on 2 or less`](#/d/d6_reroll_once_on_2_or_less) -- triggers on 1 or 2
* **Between**: [`d20 explode once on 18 20`](#/d/d20_explode_once_on_18_20) -- triggers on 18, 19, or 20

Conditions can also be limited by number of times:

* [`3d6 explode once on 6`](#/d/3d6_explode_once_on_6) -- at most once per die
* [`3d6 explode twice on 6`](#/d/3d6_explode_twice_on_6) -- at most twice
* [`3d6 explode thrice on 6`](#/d/3d6_explode_thrice_on_6) -- at most three times
* [`3d6 explode 10 times on 5 or more`](#/d/3d6_explode_10_times_on_5_or_more) -- at most N times
* [`3d6 explode on 6`](#/d/3d6_explode_on_6) -- no limit (default)

# Explode

An exploding die is rolled again whenever it hits a trigger. All rolls are kept as separate dice and summed. [`3d6 explode on 5 or more`](#/d/3d6_explode_on_5_or_more) or shorthand [`3d6e5`](#/d/3d6e5).

Example: [`d6 explode once on 5 or more`](#/d/d6_explode_once_on_5_or_more) -- roll a 5, roll again, get 3. Result: two dice showing 5 and 3 (total 8).

# Reroll

Same syntax as explode, but only the last roll counts: [`3d6 reroll on 2 or less`](#/d/3d6_reroll_on_2_or_less) or shorthand [`3d6r2`](#/d/3d6r2).

Example: [`d6 reroll once on 1`](#/d/d6_reroll_once_on_1) -- roll a 1, roll again, get 4. Result: 4 (the 1 is discarded).

# Compound

Like explode, but the extra rolls are added to the *original* die rather than producing new dice.

[`d6 compound on 6`](#/d/d6_compound_on_6) or shorthand [`3d6ce6`](#/d/3d6ce6). Supports the same time limits: [`d6 compound once on 6`](#/d/d6_compound_once_on_6), [`d6 compound twice on 6`](#/d/d6_compound_twice_on_6), etc.

Example: [`d6 compound once on 6`](#/d/d6_compound_once_on_6) -- roll a 6, roll again, get 4. Result: one die showing 10.

# Emphasis

[Rolling With Emphasis](https://homebrewery.naturalcrit.com/share/wyL-vuEIDrbC) is a mechanic by Brennan Lee Mulligan: roll two dice and take the result furthest from the average. This increases the chance of extreme results (natural 1 or max).

* [`d20 emphasis`](#/d/d20_emphasis) -- ties resolved by rerolling
* [`d20 emphasis high`](#/d/d20_emphasis_high) -- ties go to the higher value
* [`d20 emphasis low`](#/d/d20_emphasis_low) -- ties go to the lower value

You can specify a custom center point instead of the average: [`d20 furthest from 8`](#/d/d20_furthest_from_8), with optional [`d20 furthest from 8 high`](#/d/d20_furthest_from_8_high), [`d20 furthest from 8 low`](#/d/d20_furthest_from_8_low), or [`d20 furthest from 8 reroll`](#/d/d20_furthest_from_8_reroll) tie-breakers.

# Dice Pools

Count how many dice meet a threshold, for systems like World of Darkness or Shadowrun.

* [`8d10 count >= 6`](#/d/8d10_count_%3E=_6) -- count successes rolling 6 or higher
* [`3d6 count = 5`](#/d/3d6_count_=_5) -- count exact matches
* [`4d6 count <= 2`](#/d/4d6_count_%3C=_2) -- count values at or below 2
* [`4d6 count > 4`](#/d/4d6_count_%3E_4) and [`4d6 count < 3`](#/d/4d6_count_%3C_3) -- strict comparisons

Shorthand: [`8d10c6`](#/d/8d10c6) for `count >= 6`.

Dice pools compose with other modifiers: [`8d10 explode on 10 count >= 6`](#/d/8d10_explode_on_10_count_%3E=_6).

# Seeded Rolls

Enable the **use seed** checkbox below the result to get reproducible rolls. With the same seed and expression, you always get the same result. Change the seed number to get a different sequence. Useful for sharing specific rolls or testing.

# Probability Charts

Below the roll result, three bar charts show the probability distribution of your expression:

* **At least** -- chance of rolling this value *or higher*
* **Probabilities** -- chance of rolling *exactly* this value
* **At most** -- chance of rolling this value *or lower*

Hover over any bar to see the exact percentage. Probabilities are computed in the background and refine over time. For large ranges, values are grouped into buckets.

  [1]: #/d/((3d6,9)_keep_1_+_2)_*_2
