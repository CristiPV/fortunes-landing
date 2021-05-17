# Tests

> Question: What tests and how do you want to test the project?
>> Note: Translated with Google Translate

## Api
 - I would have a test which verifies that the API loaded up and connected to the Database.

 - I would write Unit tests for the methods that I wrote in the Service and Controller layers. ( Using JUnit )

 - I would have functional tests for the endpoints with mocked database data to ensure that the endpoints behave as expected.

## React app
 - I would test that each component loads up properly.
 
 - I would test the behavior of the Wheel Component in different scenarios:
   - no items on the wheel
   - only one item on the wheel
   - having too many items to be able to render the wheel properly
   - having a normal amount of items ( 6-8 items )

 - I would test that the buttons link properly

 - I would test that the item presets get properly applied whenever they are changed

# Hosting

> Question: How would you host the program if there were 100 users per minute, 10,000
users per minute or 100,000 per minute?
>> Note: Translated with Google Translate

Currently, both the API and the frontend app are hosted on the same Ubuntu EC2 instance on Amazon Web Services ( AWS ).

I have tested the website with 50 concurrent users for 10 minutes on [blazemeter](https://a.blazemeter.com/app/). The results were: average response time was 180 ms, avg. throughput was 146 requests per second and an avg. bandwidth of 299 KiB/s.

The results were stable throughout the test, even as the amount of users increased up to 50, indicating that the application can handle an even higher load. ( 50 is the maximum I can test with for free )

 - For 100 users/min: the current setup already works:
   - One 2GB Ubuntu AWS EC2 instance running both the API and the frontend App
 - For 10.000 users/min: 
   - I would split the API and App on two different instances. ( perhaps have the API be on an elastic instance such as AWS Elastic BeanStalk - EBS for scalability )
 - For 100.000 users/min: 
   - I would have both instances be elastic ( EBS ) so each instance can be scaled up individually, if needed

# Technical Challenges

> Question: Technical challenges that the project may encounter in the next period
>> Note: Translated with Google Translate

 - In the case that there is an increased mobile usage, the frontend app has to be reworked to scale properly on the mobile device.

 - The project is currently running on **http**. For production, the website should be served over **https** exclusively.

 - There is only one Database. Further in the future, it might need to scale.

 - Currently, the entire API is publicly accessible.

