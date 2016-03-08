# workshop
This repo contains all the stuff that we're going to use during the workshop.

## Examples
the `examples` folder contains the source code of the examples given in the slides

## Hands-on
1. It's organized by levels
2. Compress the virtual bulb plugin using a terminal (this will be 'terminal1') ->
    `cd App-Plugin`
    `beast pkg bulb-plugin-master -p bulb-plugin-master.tar.gz`
3. Start the dashboard in other terminal ('terminal2') -> `beast start`
4. In 'terminal1' execute `beast install bulb-plugin-master.tar.gz`
5. Once it's installed, open it though plugins button in dashboard
6. Go to `level-1/sampleApp`  in 'terminal1'-> `cd Hands-on/level-1/sampleApp`
7. Execute `./server.js`
8. Open the webapp in your browser in http://localhost:XXXX/bulb/
