# Invite Links for Delta Chat

This repository contains the files for <https://i.delta.chat>
which is used to handle so called "Invite Links".

"Invite Links" are an alternative
to scan each other's QR code to get in contact or to join groups.

You can share these links over any 3rd party platform.
If recipients taps the links, they are
either offered to install Delta Chat and tap an "Open Chat" link
or, depending on the platform, an installed Delta Chat opens directly.

The links contain the same data as Delta Chat's [OPENPPG4FPR](https://github.com/deltachat/interface/blob/master/uri-schemes.md#openpgp4fpr-) QR codes,
but with OPENPGP4FPR scheme removed.

Example:

```
https://i.delta.chat/#807051AD3E806754D35B209D788D9A0DDEAC3DB7&a=alice%40example.org&n=&i=7c5GSncKpIf&s=56k2HTPQCMd
```

The example is not functional, to create real invite links,
open Delta Chat and select **QR code → Show QR Invite Code → Share**

Note, that all data are added to the [URI Fragment](https://en.wikipedia.org/wiki/URI_fragment),
by that, no user data is sent to the server.

<https://i.delta.chat> does not get any user data that way
and only exists to deliver some static files.


### Developing

You can clone this repository, edit the files and open `index.html` -
as everything's static[^1], you can test and play around.
Even "Open Chat" should work if Delta Chat is installed.

However, note, that local or other sever's links cannot open Delta Chat directly.

[^1] if you want to change the qr code library `qr.min.js`, you instead need to edit it's source in src and then run `npm run build-qr-generator` to recompile it.