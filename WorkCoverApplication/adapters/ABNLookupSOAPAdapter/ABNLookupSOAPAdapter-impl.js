var guid = 'c71d6186-4534-4095-b82f-7214b9a8b2a6';

function getABNByName(searchName, postCode) {

	var request = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
			+ '<soap:Body>'
			+ '<ABRSearchByName xmlns="http://abr.business.gov.au/ABRXMLSearch/">'
			+ '<externalNameSearch><authenticationGUID>'
			+ guid
			+ '</authenticationGUID>'
			+ '<name>'
			+ searchName
			+ '</name>'
			+ '<filters>'
			+ '<nameType>'
			+ '<tradingName>N</tradingName>'
			+ '<legalName>Y</legalName>'
			+ '</nameType>'
			+ '<postcode>'
			+ postCode
			+ '</postcode>'
			+ '<stateCode>'
			+ '<QLD>Y</QLD>'
			+ '<NT>Y</NT>'
			+ '<SA>Y</SA>'
			+ ' <WA>Y</WA>'
			+ '<VIC>Y</VIC>'
			+ '<ACT>Y</ACT>'
			+ '<TAS>Y</TAS>'
			+ ' <NSW>Y</NSW>'
			+ '</stateCode>'
			+ '</filters>'
			+ '</externalNameSearch>'
			+ '<authenticationGuid>'
			+ guid
			+ '</authenticationGuid>'
			+ '</ABRSearchByName>'
			+ '</soap:Body>'
			+ '</soap:Envelope>';

	var input = {
		method : 'post',
		returnedContentType : 'text/xml; charset=utf-8',
		path : '/abrxmlsearch/AbrXmlSearch.asmx',
		body : {
			content : request.toString(),
			contentType : 'text/xml; charset=utf-8',
		},
	};
	return WL.Server.invokeHttp(input);
}

function getABNDetailByABN(abnNumber) {
	var request = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
			+ '<soap:Body>'
			+ '<ABRSearchByABN xmlns="http://abr.business.gov.au/ABRXMLSearch/">'
			+ ' <searchString>'
			+ abnNumber
			+ '</searchString>'
			+ '<includeHistoricalDetails>Y</includeHistoricalDetails>'
			+ ' <authenticationGuid>'
			+ guid
			+ '</authenticationGuid>'
			+ '</ABRSearchByABN>' + ' </soap:Body>' + '</soap:Envelope>';

	var input = {
		method : 'post',
		returnedContentType : 'text/xml; charset=utf-8',
		path : '/abrxmlsearch/AbrXmlSearch.asmx',
		body : {
			content : request.toString(),
			contentType : 'text/xml; charset=utf-8',
		},
	};
	return WL.Server.invokeHttp(input);
}
