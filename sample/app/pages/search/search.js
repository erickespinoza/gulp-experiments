'use strict';

var APP = window.APP = window.APP || {};

APP.search = (function(){

    // Container for results/message templates
    var searchResults = $('.page-content');

    // Get location.search query parameters
    var getURLParameterByName = function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    // Convert XML Results to JS Object
    var xmlToJson = function(xml) {
        // by David Walsh @ http://davidwalsh.name/convert-xml-json
        var obj = {};
        if (xml.nodeType === 1) {
            if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
                for (var j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) { // text
            obj = xml.nodeValue;
        }
        if (xml.hasChildNodes()) {
            for(var i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                if (typeof(obj[nodeName]) === "undefined") {
                    obj[nodeName] = xmlToJson(item);
                } else {
                    if (typeof(obj[nodeName].push) === "undefined") {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJson(item));
                }
            }
        }
        return obj;
    };

    // Parse search results from JSON response
    var parseJsonResponse = function(jsonResponse, phrase, page, start) {
        // Search data model
        var search = {
            totalRows: 0,
            rowCount: 0,
            startRecord: start,
            fromRecord: start + 1,
            toRecord: 0,
            query: phrase,
            results: [],
            pagination: {
                page: page,
                next: 0,
                prev: 0
            }
        };
        // Parse relevant results from JSON-converted response data
        var relevantResults = jsonResponse.query.PrimaryQueryResult.RelevantResults;
        if (typeof relevantResults !== 'undefined') {
            if (typeof relevantResults.TotalRows !== 'undefined') {
                search.totalRows = parseInt(relevantResults.TotalRows['#text'], 10);
                if (search.totalRows === 1) { search.totalRows = 0; }
            }
            if (typeof relevantResults.RowCount !== 'undefined') {
                search.rowCount = parseInt(relevantResults.RowCount['#text'], 10);
                search.toRecord = start + search.rowCount;
            }
            if (search.totalRows > 0 && search.rowCount > 0) {
                if (typeof relevantResults.Table.Rows !== 'undefined') {
                    // Parse search result values
                    var rows = relevantResults.Table.Rows.element;
                    var numRows = rows.length;
                    // Push search results to data model
                    for (var i = 0; i < numRows; i++) {
                        search.results.push({
                            url: rows[i].Cells.element[3].Value['#text'],
                            title: rows[i].Cells.element[4].Value['#text'],
                            summary: rows[i].Cells.element[6].Value['#text'],
                            desc: rows[i].Cells.element[9].Value['#text']
                        });
                    }
                    // Calculate pagination values
                    search.pagination.next = (search.totalRows - 1 > search.toRecord) ? (page + 1) : false;
                    search.pagination.prev = (page - 1 > 0) ? (page - 1) : false;
                }
            }
        }
        return search;
    };

    // Search Endpoint (POST, XML Response)
    var searchRequest = function(phrase, page) {
        // Parameter 'phrase' must have a value, but 'page' may be an empty string
        if (typeof phrase !== 'undefined' && phrase !== '' && phrase !== null) {
            if (typeof page !== 'undefined' && page !== null) {
                
                // Normalize page parameter
                if (page === "") { page = 1; }
                page = parseInt(page, 10);

                // Derive start from page number
                var start = (page * 10) - 10;

                // Display loading graphic
                searchResults.html(APP.templates['search/loading']());

                // Perform API request
                $.ajax({
                    type: 'POST',
                    url: 'http://www.baxter.com/big/search.html',
                    data: {
                        c: 'http://www.baxter.com/',
                        refinementFilters: '',
                        StartRow: start,
                        s: phrase
                    },
                    success: function (xmlResponse) {
                        if (xmlResponse !== '' && xmlResponse !== null && typeof xmlResponse !== 'undefined') {
                            // Parse results from XML response
                            var results = parseJsonResponse(xmlToJson(xmlResponse), phrase, page, start);
                            // Pass model to Handlebars search/results template
                            searchResults.html(APP.templates['search/results'](results));
                        } else {
                            searchResults.html(APP.templates['search/error']({
                                "message": 'The server returned an empty response. Please check your search and try again.'
                            }));
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        // Display generic error message
                        searchResults.html(APP.templates['search/error']({
                            "message": 'An error occurred while searching. Please check your search and try again.'
                        }));
                    },
                    dataType: 'xml'
                });
            }
        } else {
            // Display "invalid query" error message
            searchResults.html(APP.templates['search/error']({
                "message": 'Empty or invalid search. Please enter a valid query and try again.'
            }));
        }
    };

    var submitSearch = function(event) {
        var form = $(this);
        var inputText = form.children('[type="text"]');
        if (inputText.val().replace(/^\s+|\s+$/gm,'') === '') {
            inputText.val('').focus();
            event.preventDefault();
        }
    };

    var bindEventsToUI = function() {

        // Search submission events
       $('.search').on('submit', '.searchForm.results', submitSearch);
        
        // Get search parameters on page load
        var query = getURLParameterByName('q');
        var page = getURLParameterByName('p');
        // Attempt to perform search request
        searchRequest(query, page);
    };

    var init = function() {
        bindEventsToUI();
    };

    /**
     * interfaces to public functions
     */
    return {
        init: init
    };

}());
