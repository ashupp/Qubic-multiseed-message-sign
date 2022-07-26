# Qubic-multiseed-message-sign
### Helps creating signed messages for multiple seeds
***i.e. for generating register messages for the discord poll bot to register user as computor***

### Disclaimer: This tool is for educational use only. Proceed with caution when messing with your seeds. Check source code so you know what is happening. Only use test seeds when using this tool. Dont use it unless you know exactly what you are doing and you understand the possible risks.

#### Usage
- Clone
- install dependencies with `npm install`
- run `node index.js` and see what happens
- open index.js and insert your seeds 
- change the message and if needed prefix and suffix
  - current configuration is for generating /register messages for discord poll bot
- run `node index.js` again and check if output fits your needs

#### Save output to file
To save the output just pipe the command to the desired file.  
`node index.js > output.txt`
