'use strict';
const apikey = 'TeiaFwgCIPC1wV0nCiuVoAEqeCDeCGdMfNudJXEV';
const url = 'https://developer.nps.gov/api/v1/parks';



function getResults(search, search2, maxResults) {
    fetch(`${url}?stateCode=${search},${search2}&limit=${maxResults}&api_key=${apikey}`)
    .then(response => response.json())
    .then (json => {
        console.log(json);
        for (let i=0; i < json.data.length; i++) {
            const results = json.data[i].fullName;
            const description = json.data[i].description;
            const website = json.data[i].url;

            displayresults(results, description, website); 
        }
    })
    .catch(function(error) {
        console.log('Request failed', error)
    });
}

function displayresults(results, description, website) {
    $('.results').append(`<h3>${results}</h3>
    <p>${description}</p><p><a href="${website}" target="_blank">Park Website</a></p>`)
}


$('.removeState').on('click', function() {
    $('.removeState, .states2').hide();
    $('.addState').show();
})

$('.addState').on('click', function(e) {
    e.preventDefault();
    $('.addState').hide();
    $('.states2, .removeState').show();
});

$('.submitbtn').on('click', function(e) {
    e.preventDefault();
    let search=($('.states option:selected').val());
    let search2=($('.states2 option:selected').val());
    let maxResults=$('.maxResults').val();

    getResults(search, search2, maxResults);
});

/* 
if states val === states2 val alert (select 2 different states)
if states(2) index is 0 alert please select a state */
