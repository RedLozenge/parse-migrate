parse-migrate
=============

Exmaple Migration File
----------------------

```
/* global exports */
'use strict';

var menuItemTemplates = [];

exports.up = function(Parse, helpers) {
    return helpers.createUniqueObjectsFromTemplates(menuItemTemplates);
};

menuItemTemplates = [
    {
        __class: 'MenuItem',
        active: true,
        name: 'Soda',
        price: 1.50,
        menu: {
            __search: 'Menu',
            name: 'Drinks',
        }
    },
    {
        __class: 'MenuItem',
        active: true,
        name: 'Hamburger',
        price: 10,
        menu: {
            __search: 'Menu',
            name: 'Lunch'
        }
    }
}
```

In the above example, two menu item objects are to be created: a soda and a
hamburger. They will be created in a Parse class called `MenuItem`, if no
existing objects with the same `active`, `name`, `price`, and `menu` properties
are found.

The `menu` properties are Parse references to other objects. Those references
get created by a search that runs against the `Menu` class for the properties
listed (`name`.) References only get created if a _single_ matching object is
found, otherwise an error will be thrown.
