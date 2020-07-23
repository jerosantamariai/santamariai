import React from 'react'

const PrintNames = () => {
    let names = ["Bárbara", "Macarena", "Carla", "Javiera", "Tomás", "Andres", "Jerónimo"];
    function sortnames() {
        return names.sort();
    };
    console.log(sortnames());

    let nums = [1, 2, 3, 4, 5]


    function arraysum() {
        return (
            nums.reduce(function (a, b) {
                return a + b;
            }, 0)
        )
    }

    console.log(arraysum());


    return (

        <div>
            {names.map((name, i) => {
                return (
                    <li key={i}>{name}</li>
                )
            })}
        </div>
    );
}

export default PrintNames;