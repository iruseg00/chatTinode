// btoa replacement. Stock btoa fails on on non-Latin1 strings.
function b64EncodeUnicode(str) 
{
    // The encodeURIComponent percent-encodes UTF-8 string,
    // then the percent encoding is converted into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
}

function b64DecodeUnicode(str) 
{
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
} 
