# ParTSing
[![build status](https://travis-ci.org/fponticelli/partsing.svg?branch=master)](https://travis-ci.org/fponticelli/partsing) [![npm version](https://badge.fury.io/js/partsing.svg)](https://badge.fury.io/js/partsing) ![npm version](https://img.shields.io/github/license/fponticelli/partsing.svg) [![codecov](https://codecov.io/gh/fponticelli/partsing/branch/master/graph/badge.svg)](https://codecov.io/gh/fponticelli/partsing)

*ParTSing* is a decoder combinator library for TypeScript. You can use it to build parsers/decoders from text, tokens or really any input value.

If you want full control over what to decode your should start from `partsing/core/decoder`. It provides 3 types parameters

* `In` for the input. Remember that you will need to decode one portion of your input at the time and your input probably needs to track somehow the current position.
* `Out` it's the type of the value if successfully decoded.
* `Err` it's the type of the failure returned when the parser fails.

The library provides two additional set of utility functions to decode `string` values (`partsing/text`) and native JS values (`partsing/value`).

## Decoder Error

If you adopt the generic `Decoder` directly, you can define the shape of your error. The library provides a `DecoderError` type that should fit most decoding needs. The type of errors available are defined in `partsing/error`.

`DecoderError` provides a simple method to debug the result of the decoding (`toString`) but still leaves the flexibility to give granular control on the representation of the error.

Both [Text Decoding] and [Value Decoding] use `DecodeError`.

## Text Decoding

To be able to keep track of the position of the decoding within a `string`, Text Decoding uses `TextInput` to track both the entire text `input` and the current `index`.

The `decodeText` function simplifies the inputs and outputs of decoding text. It takes a text decoder (`Decoder<TextInput, T, DecoderError>`) and return a function that takes a string input and returns a `DecodeResult<string, T, string>` (where input and error are of type `string`).

If you intend to write your own regular expressions decoder functions, consider using the `y` (`sticky`) flag. When used, there is no need to reallocate slices of the input string saving memory and CPU cycles. The `sticky` flag is not available for all implementations of JS.

## Value Decoding

To be able to keep track of the position of the decoding within `any` value, Value Decoding uses `ValueInput` to track both the `input` value and the current position within it using a `path`. `path` is an array of either `string` (object field name) or `number` (array/tuple index position).

The `decodeValue` function simplifies the inputs and outputs of decoding values. It takes a value decoder (`Decoder<ValueInput, T, DecoderError>`) and return a function that takes `any` and returns a `DecodeResult<any, T, string>` (where input is of type `any` and error is of type `string`).

## Example

A simple decoder combinator to parse color values from strings into class instances.

```typescript
class RGB {
  constructor(readonly rgb: number) {}
  toString() {
    let s = this.rgb.toString(16)
    while (s.length < 6) s = `0${s}`
    return `#${s}`
  }
}

class Grey {
  constructor(readonly value: number) {}
  toString() {
    return `grey ${this.value}`
  }
}

class HSL {
  constructor(readonly hue: number, readonly saturation: number, readonly lightness: number) {}
  toString() {
    return `hsl(${this.hue},${this.saturation},${this.lightness})`
  }
}

type Color = RGB | Grey | HSL

// Hue in HSL is generally measured as an angle, not a ratio
const ratioDecoder = regexp(/0[.]\d+/y).map(Number)
const rgbDecoder = regexp(/[#]([0-9a-f]{6})/iy, 1)
  .map(v => parseInt(v, 16))
  .map(v => new RGB(v))
const greyDecoder = matchInsensitive('grey')
  .or(matchInsensitive('gray'))
  .skipNext(optionalWhitespace)
  .pickNext(ratioDecoder)
  .map(v => new Grey(v))
const hslDecoder = ratioDecoder
  .repeatWithSeparator(3, match(','))
  .map(v => new HSL(v[0], v[1], v[2]))
  .surroundedBy(matchInsensitive('hsl('), match(')'))

const colorTextDecoder = decodeText(
  // the `eoi` at the end, makes sure that there is nothing left to decode
  oneOf(rgbDecoder, greyDecoder, hslDecoder).skipNext(eoi)
)

// all results are wrapped in a DecodeSuccess
// colorTextDecoder('#003355')          == new RGB(0x003355)
// colorTextDecoder('gray 0.3')         == new Grey(0.3)
// colorTextDecoder('gray0.2')          == new Grey(0.2)
// colorTextDecoder('HSL(0.1,0.2,0.3)') == new HSL(0.1,0.2,0.3)
```

Another scenario where decoding comes in handy is to validate, type and transform payloads from JSON requests. You can decode a value (after being parsed by `JSON.parse`) into one of the `Color` types described above.

A few examples of valid JSON payloads:

```json
"#003366"
```

```json
{ "grey": 0.5 }
```

```json
{ "kind": "hsl", "h": 0.2, "s": 0.5, "l": 0.8 }
```

Here is a `colorValueDecoder` definition that can deal with those cases:

```typescript
const ratioValue = numberValue.test(v => v >= 0 && v <= 1, DecodeError.expectedWithinRange('0', '1'))

// reuse the rgbDecoder defined above to validate and trasform the string value into an RGB instance
// example: "#003366"
const rgbValue = stringValue.sub(rgbDecoder, input => ({ input, index: 0 }), v => v)

// example: { "grey": 0.5 }
const greyValue = objectValue(
    { grey: ratioValue },
    [] // the empty array means that no fields are optional
  ).map(v => new Grey(v.grey))

// example: { "kind": "hsl", "h": 0.2, "s": 0.5, "l": 0.8 }
const hslValue = objectValue(
    {
      kind: literalValue('hsl'),
      h: ratioValue,
      s: ratioValue,
      l: ratioValue
    },
    []
  ).map(v => new HSL(v.h, v.s, v.l))

const colorValueDecoder = decodeValue(
    oneOf(
      DecodeError.combine,
      rgbValue,
      greyValue,
      hslValue
    )
  )
```
