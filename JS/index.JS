'use strict';
const apikey = 'TeiaFwgCIPC1wV0nCiuVoAEqeCDeCGdMfNudJXEV';
const url = 'https://developer.nps.gov/api/v1/parks';



function getResults(search, search2, search3, maxResults) {
    fetch(`${url}?stateCode=${search},${search2},${search3}&limit=${maxResults}&api_key=${apikey}`)
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
    $('.searchresults').append(`<h3>${results}</h3>
    <p>${description}</p><p><a href="${website}" target="_blank">Park Website</a></p>`)
}


$('.removeState').on('click', function(e) {
    e.preventDefault();
    if ($('.states3').is(':visible')) {
        $('.states3').hide();
        $('.addState').show();
    }
    else {
        $('.states2').hide();
        $('.removeState').hide();
    }
})

$('.addState').on('click', function(e) {
    e.preventDefault();
    if ($(".states2").is(":visible")) {
        $('.states3').show();
        $('.addState').hide();
    }
    $('.states2, .removeState').show();
});

$('.submitbtn').on('click', function(e) {
    e.preventDefault();
    $('.searchResults').empty();
    let search=($('.states option:selected').val());
    let search2=($('.states2 option:selected').val());
    let search3=($('.states3 option:selected').val());
    let maxResults=$('.maxResults').val();
    getResults(search, search2, search3, maxResults);
});

$('.resetbtn').on('click', function() {
    $('.searchResults').hide();
    $('.maxResults').val(10)
    $('option').prop('selected', function() {
        return this.defaultSelected;
    });
    $('.states2, .states3, .removeState').hide();
    $('.addState').show(); 
});

/* 
if states val === states2 val alert (select 2 different states)
if states(2) index is 0 alert please select a state */
