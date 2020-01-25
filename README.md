# flock-google-sheet-integration
This script helps you post messages to a Flock channel on successful Google Form submission

# Follow below steps to setup incoming webhooks in Flock
1. Go to dev.flock.com
2. Go to Webhooks tab
3. Add an incoming webhook
4. Now select the channel you wish to post the message to, name of the Bot that will post it
5. Upload an image for the Bot if you like
6. Save and generate the URL
7. Now open the response sheet of the Google Form
8. Go to Tools -> Script Editor
9. Copy paste the content of the script file in the repo
10. Replace the URL generated in the script file in the variable *flockIncomingWebhookUrl*.
11. Now run the initialize function once.

Voila! That's it. 
Submit a form to check if the integration is working as intended. If not, follow the above steps to see if you made a mistake somewhere.

# Further scope
You can format the string in anyway you like.
