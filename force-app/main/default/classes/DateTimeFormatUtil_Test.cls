@isTest
private class DateTimeFormatUtil_Test {

    @isTest static void test_formatDateTime() {
        
        String dateTimeString = null;
        
        DateTimeFormatUtil util = new DateTimeFormatUtil();
               
        // all parms
        util.dateTimeValue = DateTime.now();
        util.dateTimeFormat = 'EEE MMM d, yyyy hh:mm:ss a z';
        util.dateTimeZone = 'MDT'; // 'GMT-06:00';
        dateTimeString = util.getFormattedDateTime();
        System.debug('DateTimeFormatUtil_Test > test_formatDateTime - (all parms MDT) dateTimeString: ' + dateTimeString);

        // different time zone
        util.dateTimeZone = 'PDT'; // 'GMT-07:00';
        dateTimeString = util.getFormattedDateTime();
        System.debug('DateTimeFormatUtil_Test > test_formatDateTime - (no parms PDT) dateTimeString: ' + dateTimeString);
        
        // no timezone
        util.dateTimeZone = null;
        dateTimeString = util.getFormattedDateTime();        
        System.debug('DateTimeFormatUtil_Test > test_formatDateTime - (no timezone) dateTimeString: ' + dateTimeString);
       
        // test - no format
        util.dateTimeFormat = null;
        dateTimeString = util.getFormattedDateTime();        
        System.debug('DateTimeFormatUtil_Test > test_formatDateTime - (no format) dateTimeString: ' + dateTimeString);
        
        // test - no parms
        util.dateTimeValue = null;
        dateTimeString = util.getFormattedDateTime();
        System.debug('DateTimeFormatUtil_Test > test_formatDateTime - (no parms) dateTimeString: ' + dateTimeString);
        
    } // end test_formatDateTime
    
}