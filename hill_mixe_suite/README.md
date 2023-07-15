# HILL MixE Suite

*Important* If using or adapting an interface from the Suite, please ensure to consult any respective institutional requirments wrt crowdsourcing / participant ethics. We include a templated version of the consent form that we used, but please ensure that any form used in your study adequately matches institutional requirements. 

`HILL MixE Suite` comprises several new elitication interfaces to garner human perceptual judgments about mixed images: 
* `select-synth-midpoint`: the "Construct" elicitation scheme proposed in Section 3.
* `select-shuffled-synth-midpoint`: the "Select Shuffled" elicitation scheme proposed in Section 3.
* `infer-mixing-factor-with-unc`: the elicitation scheme to elicit participants' perception of the mixing coefficient used to generate a mixed image, alongside participant uncertainty in their inference (see Section 4). 

Each folder here can serve as a standalone interface. We have maintained the structure of the subfolders s.t. the interfaces should be readily launchable when using the folders as a base for a [Pavlovia](https://pavlovia.org/dashboard?tab=1) experiment. If using Pavlovia, we encourage creating a new GitLab project, and uploading the code for the subfolder/interface that is of interest. Each interface would need to be a different GitLab project. We employed our institutional license to run on Pavlovia; however, at the time of constructing this repo, Pavlovia kindly offers free account creation and free experiemnt piloting, with the ability to purchase tokens to run huma experiments if missing an institutional license. 

If you do not wish to use Pavlovia, the code should be readily extendable; however, you will need to build your own experiment server or use another source. 

We include further tips across the interfaces: 
* Stimuli are housed in the "imgs"/ directory. We pre-construct mixed images by linearly combining random subsets of the CIFAR-10 images, as described in our [Supplement](https://proceedings.mlr.press/v216/collins23a/collins23a-supp.pdf). Batching of those images (i.e., which sets of stimuli a new participant should be allocated to) are specified in a json in the "resources/" directory. If you wish to run a similar experiment with different stimuli, we recommend changing those. You may wish to modify the demo images included in your instructions, depending on the adaptations you make. 
* The task.js file houses the main experimental logic.
* As mentioned above, please ensure to modify the consent.html as needed.

Please do not hesitate to post a GitHub issue or reach out to Katie Collins (kmc61@cam.ac.uk) with any questions regarding `HILL MixE Suite`.




