var timeline = []

/* init connection with pavlovia.org */
var pavlovia_init = {
  type: "pavlovia",
  command: "init"
};
timeline.push(pavlovia_init);

// capture info from Prolific
// help from: https://www.jspsych.org/overview/prolific/
var prolific_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');
// subj id help from: https://www.jspsych.org/7.0/overview/data/index.html
// generate a random subject ID with 15 characters
var subject_id = jsPsych.randomization.randomID(15);
jsPsych.data.addProperties({
    subject: subject_id,
    prolific_id: prolific_id,
    study_id: study_id,
    session_id: session_id
});

// pick a random condition for the subject at the start of the experiment 
// help from: https://www.jspsych.org/overview/prolific/ 
// based on our total number of batches <--- note: can subset if we need to run some a few more
// var num_batches = 14
// var conditions = Array.from(Array(num_batches).keys()) // help from: https://www.codegrepper.com/code-examples/javascript/javascript+create+list+of+numbers+1+to+n 

var conditions = [0, 1, 2, 3, 4, 5, 6, 7, 8]

var conditions = [0, 1, 2, 3, ]//4, 5, 6, 7, 8]

var conditions = [2, 4, 5, 6]
var condition_num = jsPsych.randomization.sampleWithoutReplacement(conditions, 1)[0];
var condition_num = 2


// record the condition assignment
jsPsych.data.addProperties({
  condition: condition_num
});

// index into batched mixup images 
// javascript loading help from: https://github.com/jspsych/jsPsych/discussions/705
var imgs = batches[0][condition_num]

console.log("images: ", imgs.length, " batch: ", condition_num)

// consent form help from: https://gitlab.pavlovia.org/beckerla/language-analysis/blob/master/html/language-analysis.js
// sample function that might be used to check if a subject has given consent to participate.
var check_consent = function(elem) {
    if ($('#consent_checkbox').is(':checked') && $('#read_checkbox').is(':checked') && $('#age_checkbox').is(':checked')) {
	return true;
    }
    else {
	alert("If you wish to participate, you must check the boxes in the Consent Form.");
	return false;
    }
    return false;
};
var consent = {
    type:'external-html', 
    url: "consent.html", 
    cont_btn: "start", 
    check_fn: check_consent
}
timeline.push(consent)


var imgWithSliderLabels = imgs

console.log(imgWithSliderLabels)

console.log("label" + (1+1))

var num_rerun = 2 // e.g., to check consistency 

var num_show = imgs.length + num_rerun

var progress_bar_increase = 1 / num_show

var mixing_coeff_scale = [
  'None of the image',
  '50% of image',
  'All of the image'
  ]

var confidence_scale = [
  '0% Confident',
  '50% Confident',
  '100% Confident'
  ]
  
  var instructions = {
    type: "instructions",
    pages: ['<p> Welcome! </p> <p> We are conducting an experiment about how people perceive combinations of images. Your answers will be used to inform machine learning and human-computer interaction work. </p>' +
    '<p> This experiment should take at most <strong>15 minutes</strong>. </br></br> You will be compensated at a base rate of $8/hour for a total of <strong>$2</strong>, which you will receive as long as you complete the study.</p>',
        '<p> We take your compensation and time seriously! The email for the main experimenter is <strong>kmc61@cam.ac.uk</strong>. </br></br> Please write this down now, and email us with your Prolific ID and the subject line <i>Human experiment compensation</i> if you have problems submitting this task, or if it takes much more time than expected. </p>',
        '<p> In this experiment, you will be seeing low-resolution <i>images</i> of objects.</p>'+
        '<p> These images are the result of <i>combining</i> images of various object classes (e.g., a mixture of a Truck and a Cat).' +
        '<p> Your task will be to <strong>rate how much of each object class</strong> is in each image by moving a <strong>slider.</strong></p>' +
        '<p> You will also be asked your <strong>confidence</strong> in your estimates.</p>',

        '<p> Images may be combined in varying proportions. They will be superimposed on each other. These proportions are what you are asked to estimate. </p>' +
        '<p> For instance, the following is an example shows an image of a cat and dog combined with 50\% of the original cat image and 50\% of the dog. The original images can be seen on the sides. </p>' +

        '<p><img src=' + "demo/demo_Cat_Dog.png" + ' style="max-width:750px; max-height:750px;"></p>' +

        '<p> And below is a 75/25 combination of an airplane and a ship. </p>' +

        '<p><img src=' + "demo/demo_Airplane_Ship.png" + ' style="max-width:750px; max-height:750px;"></p>' +

        '<p> There is wide variety in what these examples look like. Please try your best. </p>',

        '<p> We ask that you imagine that <strong>100 crowdsourced workers</strong> are doing this task. Consider how they may respond.</p>' +
        // '<p> You may take as long as you would like to come up with an estimate </p>.',

        '<p> If these annotators would think the image is made <i>entirely of an image of one class</i>, please <strong>move the slider to that associated end</strong> (the slider will be labeled). </p>' +
        '<p> And these annotators would think the image is a <i>50/50 combination</i> or more moderate mix, please <strong>move the slider towards the middle</strong> to the appropriate proportion. </p>',


        '<p> Furthermore, if you think that the crowdsourced workers would have low confidence (high uncertainty) in their estimate, please move the confidence slider to the <strong>far left</strong></p>' +
        '<p> And if you think that they would have high confidence (low uncertainty) in their estimate, please move the slider to the <strong>far right</strong>.' ,

        '<p> You will receive a <strong>bonus</strong> of up to a rate of $9/hour (+$0.25) if you successfully identify the proportion of the underlying image classes in the combined image and/or you provide confidence estimates which are calibrated with your accuracy. </p>' +
        '<p> For instance, if you are incorrect, but correctly marked high uncertainty (and demonstrated sufficient effort), you will attain the bonus. </p>',

        '<p> You will see a total of <strong>' + num_show + ' images</strong>.</p>' +
        '<p> The labels of the images used to create the mixed up image will be displayed on the <strong>slider endpoints.</strong></p>' +
        '<p> Please pay attention that you mark your response in the slider direction that you intend.</p>',

        // '<p>You will see <strong>3 different goals</strong>, with <strong>20 plans</strong> per goal. </p>' +
        // '<p>You will get a 15 second break in between goals.</p>',
        // '<p> You will see a total of <strong>' + num_plans + '</strong> plans.</p>',//for each group. </p>',
        '<p> When you are ready, please click <strong>\"Next\"</strong> to complete a quick comprehension check, before moving on to the experiment. </p>'],
    show_clickable_nav: true
};

// var instructions = {
//     type: "instructions",
//     pages: ['<p> Welcome! </p> <p> We are conducting an experiment about how people perceive combinations of images. Your answers will be used to inform machine learning and human-computer interaction work. </p>' +
//     '<p> This experiment should take at most <strong>20 minutes</strong>. </br></br> You will be compensated at a base rate of $8/hour for a total of <strong>$2.67</strong>, which you will receive as long as you complete the study.</p>',
//         '<p> We take your compensation and time seriously! The email for the main experimenter is <strong>kmc61@cam.ac.uk</strong>. </br></br> Please write this down now, and email us with your Prolific ID and the subject line <i>Human experiment compensation</i> if you have problems submitting this task, or if it takes much more time than expected. </p>',
//         '<p> In this experiment, you will be seeing low-resolution <i>images</i> of objects.</p>'+
//         '<p> These images are the result of <i>combining</i> images of various object classes (e.g., a mixture of a Truck and a Cat).' +
//         '<p> Your task will be to <strong>rate how much of each object class</strong> is in each image by moving a <strong>slider.</strong></p>' +
//         '<p> You will also be asked your <strong>confidence</strong> in your estimates.</p>',

//         '<p> Images may be combined in varying proportions. They will be superimposed on each other. These proportions are what you are asked to estimate. </p>' +
//         '<p> For instance, the following is an example shows an image of a cat and dog combined with 50\% of the original cat image and 50\% of the dog. The original images can be seen on the sides. </p>' +

//         '<p><img src=' + "demo/demo_Cat_Dog.png" + ' style="max-width:750px; max-height:750px;"></p>' +

//         '<p> And below is a 75/25 combination of an airplane and a ship. </p>' +

//         '<p><img src=' + "demo/demo_Airplane_Ship.png" + ' style="max-width:750px; max-height:750px;"></p>' +

//         '<p> There is wide variety in what these examples look like. Please try your best. </p>',

//         '<p> We ask that you imagine that <strong>100 crowdsourced workers</strong> are doing this task. Consider how they may respond.</p>' +
//         // '<p> You may take as long as you would like to come up with an estimate </p>.',

//         '<p> If these annotators would think the image is made <i>entirely of an image of one class</i>, please <strong>move the slider to that associated end</strong> (the slider will be labeled). </p>' +
//         '<p> And these annotators would think the image is a <i>50/50 combination</i> or more moderate mix, please <strong>move the slider towards the middle</strong> to the appropriate proportion. </p>',


//         '<p> Furthermore, if you think that the crowdsourced workers would have low confidence (high uncertainty) in their estimate, please move the confidence slider to the <strong>far left</strong></p>' +
//         '<p> And if you think that they would have high confidence (low uncertainty) in their estimate, please move the slider to the <strong>far right</strong>.' ,

//         '<p> You will receive a <strong>bonus</strong> of up to a rate of $9/hour (+$0.33) if you successfully identify the proportion of the underlying image classes in the combined image and/or you provide confidence estimates which are calibrated with your accuracy. </p>' +
//         '<p> For instance, if you are incorrect, but correctly marked high uncertainty (and demonstrated sufficient effort), you will attain the bonus. </p>',

//         '<p> You will see a total of <strong>' + num_show + ' images</strong>.</p>' +
//         '<p> The labels of the images used to create the mixed up image will be displayed on the <strong>slider endpoints.</strong></p>' +
//         '<p> Please pay attention that you mark your response in the slider direction that you intend.</p>',

//         // '<p>You will see <strong>3 different goals</strong>, with <strong>20 plans</strong> per goal. </p>' +
//         // '<p>You will get a 15 second break in between goals.</p>',
//         // '<p> You will see a total of <strong>' + num_plans + '</strong> plans.</p>',//for each group. </p>',
//         '<p> When you are ready, please click <strong>\"Next\"</strong> to complete a quick comprehension check, before moving on to the experiment. </p>'],
//     show_clickable_nav: true
// };

var correct_task_description = "The proportion of classes making up an image and your confidence in your estimate."

var correct_perspective_description = "100 crowdsourced workers."
var incorrect_perspective_description = "Your own."
var incorrect_perspective_description2 = "Your dog's."

var comprehension_check = {
    type: "survey-multi-choice",
    preamble: ["<p align='center'>Check your knowledge before you begin. If you don't know the answers, don't worry; we will show you the instructions again.</p>"],
    questions: [
        {
            prompt: "What will you be asked to determine in this task?",
            options: [correct_task_description, "The similarity between images of cats and trucks.", "The funniness of jokes and your confidence in your estimate.",],
            required: true
        },
        {
            prompt: "How will you be providing your answers?</i>",
            options: ["By writing text.", "By selecting an option from a multiple choice scale.", "By moving a slider."],
            required: true
        },

        {
            prompt: "Whose perspective are you considering when making your response?</i>",
            options: [incorrect_perspective_description, incorrect_perspective_description2, correct_perspective_description],
            required: true
        },
    ],
    on_finish: function (data) {
        var responses = data.response;

        console.log(data)

        console.log(data.response)

        if (responses['Q0'] == correct_task_description && responses['Q1'] == "By moving a slider." && responses['Q2'] == correct_perspective_description) {
            familiarization_check_correct = true;
        } else {
            familiarization_check_correct = false;
        }
    }
}

var familiarization_timeline = [instructions, comprehension_check]

var familiarization_loop = {
    timeline: familiarization_timeline,
    loop_function: function (data) {
        return !familiarization_check_correct;
    }
}

timeline.push(familiarization_loop)

var final_instructions = {
    type: "instructions",
    pages: ['<p> Now you are ready to begin! </p>' +
    '<p> Please click <strong>\"Next\"</strong> to start the experiment. Note, it may take a moment for each image to load. </p>' + 
    '<p> Thank you for participating in our study! </p>'],
    show_clickable_nav: true
};
timeline.push(final_instructions)

// preload stimuli
var pre_load_imgs = []
for (var i = 0; i < imgWithSliderLabels.length; i++){
    pre_load_imgs.push("imgs/" + imgWithSliderLabels[i]['filename'])
}


// preload help from: https://www.jspsych.org/6.3/plugins/jspsych-preload/
var preload = {
    type: 'preload',
    images: pre_load_imgs,
    show_detailed_errors: true
}
timeline.push(preload)



var imageWidth = 300
var imageHeight = 500

var rating_page = {
  type: 'multiple-slider',
      questions: [
        {
            prompt: function () {
                var img = jsPsych.timelineVariable('filename')
                var label1 = jsPsych.timelineVariable("label1")
                var label2 = jsPsych.timelineVariable("label2")

                img = "imgs/" + img

                var custom_mixing_scale = [
                  "100\% "+ label1,
                  "50/50 " + label1 + " and " + label2,
                  "100\% " + label2
                ]

                return '<p> ' +
                'Imagine 100 crowdsourced workers are told that the following image is a combination of images from the following classes: <strong>' + label1 + '</strong> and <strong>' + label2 +'</strong>.<br></br>' +
                // 'What combination of ' + label1 ' and ' + label2 + ' do you think ?<br></br>' +
                // '<p><img src=' + img + ' width="' + imageWidth +'" height="' + imageHeight + '"></p>' +

                // image edit help from: https://stackoverflow.com/questions/12912048/how-to-maintain-aspect-ratio-using-html-img-tag

                // '<p><img src=\"' + 'https://github.com/collinskatie/motion_without_movement/blob/main/einstein.jpeg' + '\" style="max-width:750px; max-height:750px;"></p>' +
                '<p><img src=' + img + ' style="max-width:750px; max-height:750px;"></p>' +

                '<strong>What combination of the classes do you think they would say is used to make this image?</strong><br></br>'

                // '<strong>' + jsPsych.timelineVariable("label1") + '</strong></p>'+
                // '</p>'

            },
            // name: "mixingcoeff", labels:custom_mixing_scale, required: false,
            name: "mixingcoeff", labels:function () {
                var img = jsPsych.timelineVariable('filename')
                var label1 = jsPsych.timelineVariable("label1")
                var label2 = jsPsych.timelineVariable("label2")
                return [
                  "100\% "+ label1,
                  "50/50 " + label1 + " and " + label2,
                  "100\% " + label2
                ]
              }, required: false,
        },
        // {
        //     prompt: function () {
        //         return '<strong>' + jsPsych.timelineVariable("label2") + '</strong></p>'
        //     },
        //     name: "label2", labels:mixing_coeff_scale, required: false,
        // },
        {
            prompt: function () {
                return '<strong>How confident do you think the crowdsourced workers would be in this estimate?</strong></p>'
            },
            name: "confidence", labels:confidence_scale, required: false,
        }
    ],
    randomize_question_order: false,
}

var ordered_idxs = [] // save order used

var rating_task = {
    timeline: [rating_page],
    timeline_variables: imgWithSliderLabels,//imgs,
    data: {
        filename: jsPsych.timelineVariable('filename'),
        task: 'rate_mixture',
        subj_id: jsPsych.timelineVariable('id'),
        label1: jsPsych.timelineVariable('label1'),
        label2: jsPsych.timelineVariable('label2'),
        mixtureCoeff: jsPsych.timelineVariable('mixture_coeff'),
        id1: jsPsych.timelineVariable('id1'),
        id2: jsPsych.timelineVariable('id2')
    },
    sample: {
        type: 'custom',
        fn: function (t) {
            // t = set of indices from 0 to n-1, where n = # of trials in stimuli variable
            // returns a set of indices for trials
            
            ordered_idxs = jsPsych.randomization.shuffle(t)
            return ordered_idxs
        }
    },
    on_finish: function () {
        var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(curr_progress_bar_value + progress_bar_increase);

        console.log(curr_progress_bar_value)
    }
}

timeline.push(rating_task);

// for consistency! 
var rerun_rating_task = {
    timeline: [rating_page],
    timeline_variables: imgWithSliderLabels,//imgs,
    data: {
        filename: jsPsych.timelineVariable('filename'),
        task: 'rerun_rate_mixture',
        subj_id: jsPsych.timelineVariable('id'),
        label1: jsPsych.timelineVariable('label1'),
        label2: jsPsych.timelineVariable('label2'),
        mixtureCoeff: jsPsych.timelineVariable('mixture_coeff'),
        id1: jsPsych.timelineVariable('id1'),
        id2: jsPsych.timelineVariable('id2')
    },
    sample: {
        type: 'custom',
        fn: function (t) {
            // returns a set of indices for trials
            
            // just have this for a couple of few imgs (checks), help from: https://stackoverflow.com/questions/34883068/how-to-get-first-n-number-of-elements-from-an-array

            return [ordered_idxs[15], ordered_idxs[20]] // always show the 15th and 20th

            // return jsPsych.randomization.shuffle(t).slice(0, num_rerun) 
        }
    },
    on_finish: function () {
        var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(curr_progress_bar_value + progress_bar_increase);

        console.log(curr_progress_bar_value)
    }
}
timeline.push(rerun_rating_task);

var comments_block = {
    type: "survey-text",
    preamble: "<p>Thank you for participating in our study!</p>" +
    "<p>Click <strong>\"Finish\"</strong> to complete the experiment and receive compensation. If you have any comments about the experiment, please let us know in the form below.</p>",
    questions: [
        {prompt: "Were the instructions clear? (On a scale of 1-10, with 10 being very clear)"},
        {prompt: "How challenging was it to come up with a rating per image? (On a scale of 1-10, with 10 being very challenging)"},
        {prompt: "Did you find that your stratedgy changed as the experiment progressed? If yes, in what way?"},
        {prompt: "Were there any particular qualities of images you considered when coming up with your response?", rows:5,columns:50},
        {prompt: "Do you have any additional comments to share with us?", rows: 5, columns: 50}],
    button_label: "Finish",
};
timeline.push(comments_block)

/* finish connection with pavlovia.org */
var pavlovia_finish = {
  type: "pavlovia",
  command: "finish",
};
timeline.push(pavlovia_finish);

// todo: update w/ proper prolific link!!
jsPsych.init({
    timeline: timeline,
    on_finish: function () {
        // send back to main prolific link
        // window.location = "https://www.google.com/"
        window.location = "https://app.prolific.co/submissions/complete?cc=2681CCA7"
    },
    show_progress_bar: true,
    auto_update_progress_bar: false
});
