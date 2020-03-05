## REACT ADD SPACE
<img src="https://image.freepik.com/free-vector/illustration-rocket-space_72785-46.jpg" alt="https://image.freepik.com/free-vector/illustration-rocket-space_72785-46.jpg" width="100px" height="100px">

A very trivial package to space your elements in react

[![npm version](https://badge.fury.io/js/react-add-space.svg)](https://badge.fury.io/js/react-add-space)

[![Build Status](https://travis-ci.org/AGMETEOR/react-add-space.svg?branch=master)](https://travis-ci.org/AGMETEOR/react-add-space)

## How to use
```
npm install --save react-add-space
```

## Quick Start
```
import React from 'react';
import Spacer from 'react-add-space';

const myComponent = () => {
    return(
        <div>
            Hello I need space here
            // instead of &nbsp; &nbsp;

            <Spacer amount={2} />
            and some more space here
            <Spacer amount={8} />
        </div>
    )
}
```

## Contributing
We welcome your Pull Requests

#### Clone
```
git clone https://github.com/AGMETEOR/react-add-space.git
cd react-add-space
```
#### Run
```
npm install
npm start
```

#### Tests
```
npm run test
```

License
Licensed under MIT