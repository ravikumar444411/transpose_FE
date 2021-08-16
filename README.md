Kafka :-

1. Set up Kafka 
2. Starting Kafka : 

    i. Open the terminal and run the following command

            $ confluent local services start
    
    ii. After this command, different components like Zookeeper, Kafka, Schema Registry, Connect, kSQLDB server, Control Center (at last) will get displayed to be 'UP'.

    iii. After procedure mentioned in ii. gets completed, open a browser and run 'localhost:9021', with which the control center will get open.

    iv. Click on the card shown there and click on the 'Connect' option among the options displayed on the left panel.

    v. Click on the 'connect-default'.

    vi. Click on the 'Add connector' button, followed by which, click on the 'Upload connector config file' and upload all the files present in the respective folders (user,sellers,delivery,handover,menu,barcode,pickup) of the 'DB Connectors' folder in this repository.

    vii. In the vi. step, after uploading any file don't change any field and just click on the 'Next' button at the bottom of the page and then click 'Launch'.

    viii. After the vi. step after uploading all the files one by one, under connectors list, all the connectors are displayed showing their status as running (may take some time).

    ix. Since each connector is connected to a topic, therefore, all the topics get automatically created and can be seen under the 'Topics' section.

3. After that, apply the normal procedure to start the application, i.e. use the command 'npm start' in the terminal (starting the application is required in vs code or terminal because kafka can't be used globally till Apache Kafka service is bought from Heroku).