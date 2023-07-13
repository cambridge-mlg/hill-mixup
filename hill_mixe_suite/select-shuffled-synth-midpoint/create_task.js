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
var num_batches = 9
var conditions = Array.from(Array(num_batches).keys()) // help from: https://www.codegrepper.com/code-examples/javascript/javascript+create+list+of+numbers+1+to+n

var conditions = [0, 1, 2, 5, 6]

var condition_num = jsPsych.randomization.sampleWithoutReplacement(conditions, 1)[0];
var condition_num = 7

// record the condition assignment
jsPsych.data.addProperties({
  condition: condition_num
});

// index into batched mixup images
// javascript loading help from: https://github.com/jspsych/jsPsych/discussions/705
var imgs = batches[0][condition_num]

var ordered_idxs = null

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

console.log("label" + (1+1))

var num_rerun = 2 // e.g., to check consistency

var num_show = imgs.length + num_rerun

var progress_bar_increase = 1 / num_show

// var instructions = {
//     type: "instructions",
//     pages: ['<p> Welcome! </p> <p> We are conducting an experiment about how people perceive combinations of images. Your answers will be used to inform machine learning and human-computer interaction work. </p>' +
//     '<p> This experiment should take at most <strong>20 minutes</strong>. </br></br> You will be compensated at a base rate of $8/hour for a total of <strong>$2.67</strong>, which you will receive as long as you complete the study.</p>',
//         '<p> We take your compensation and time seriously! The email for the main experimenter is <strong>kmc61@cam.ac.uk</strong>. </br></br> Please write this down now, and email us with your Prolific ID and the subject line <i>Human experiment compensation</i> if you have problems submitting this task, or if it takes much more time than expected. </p>',
//
//
//         '<p> In this experiment, you will be seeing low-resolution <i>images</i> of objects.</p>'+
//         '<p> These images are the result of <i>combining</i> images of various object classes (e.g., a mixture of a Truck and a Cat).' +
//         '<p> You will see several images per page that are the result of mixing images from two categories. </p>' +
//         '<p> You will be told the image categories being mixing. </p>' +
//         '<p> Your task is to <strong>select</strong> the image that you think is most likely to be perceived as the 50/50 mixture between the two categories.',
//
//         '<p> We ask that you imagine <i>100 crowdscourced workers</i> are shown these images.</p>'
//         + '<p> Please select the image you think they would perceive as the 50/50 mixture. </p>' +
//         '<p> You can mark your answer by clicking on the image. The image will then be outlined in red. </p>' +
//         '<p> Click Next when you want to move to the next trial. </p>',
//
//         // '<p> You will see one image at a time, and should press the <strong>g</strong> and <strong>h</strong> keys to move between images associated with each label.' +
//         // '<p> You may press the keys to toggle between the images as much as you would like. When you think you have selected the image others would as a 50/50 mixture, please press the Continue button.',
//
//         '<p> There is wide variety in what these examples look like. We ask that you select what you think most people would think of as the mid-point between two classes (e.g., between a Cat and an Airplane).</p>' +
//         '<p> The classes will change per example, and will be marked in bold. Please pay attention to read the text on each page of the experiment. </p>',
//
//         '<p> You will receive a bonus of up to a rate of $9/hour (+$0.33) if the images most closely match what <strong>other crowdsource workers perceive</strong> as the 50/50 point between those classes.</p>' +
//         '<p> We recognize this is a challenging task. Please just try your best! You will receive the base payment for fair effort.</p>',
//
//         '<p> You will create this midpoint for a total of <strong>' + num_show + ' examples</strong>.</p>' +
//
//         '<p> When you are ready, please click <strong>\"Next\"</strong> to complete a quick comprehension check, before moving on to the experiment. </p>'],
//     show_clickable_nav: true
// };

var instructions = {
    type: "instructions",
    pages: ['<p> Welcome! </p> <p> We are conducting an experiment about how people perceive combinations of images. Your answers will be used to inform machine learning and human-computer interaction work. </p>' +
    '<p> This experiment should take at most <strong>15 minutes</strong>. </br></br> You will be compensated at a base rate of $8/hour for a total of <strong>$2</strong>, which you will receive as long as you complete the study.</p>',
        '<p> We take your compensation and time seriously! The email for the main experimenter is <strong>cambridge.mlg.studies@gmail.com</strong>. </br></br> Please write this down now, and email us with your Prolific ID and the subject line <i>Human experiment compensation</i> if you have problems submitting this task, or if it takes much more time than expected. </p>',


        '<p> In this experiment, you will be seeing low-resolution <i>images</i> of objects.</p>'+
        '<p> These images are the result of <i>combining</i> images of various object classes (e.g., a mixture of a Truck and a Cat).' +
        '<p> You will see several images per page that are the result of mixing images from two categories. You will be told the image categories being mixing. </p>' +
        '<p> Your task is to <strong>select</strong> the image that you think is <strong>most likely to be perceived as the 50/50 mixture between the two categories.</strong>',

        '<p> We ask that you imagine <i>100 crowdscourced workers</i> are shown these images.</p>'
        + '<p> Please select the image you think <i>they</i> would perceive as the 50/50 mixture. </p>' +
        '<p> You can mark your answer by <strong>clicking on the image.</strong> The image will then be outlined in red. </p>' +
        '<p> Click "Next" when you want to move to the next trial. </p>',

        // '<p> You will see one image at a time, and should press the <strong>g</strong> and <strong>h</strong> keys to move between images associated with each label.' +
        // '<p> You may press the keys to toggle between the images as much as you would like. When you think you have selected the image others would as a 50/50 mixture, please press the Continue button.',

        '<p> There is wide variety in what these examples look like. We ask that you select what you think <i>other people</i> would think of as the 50/50 combination between two classes (e.g., between a Cat and an Airplane).</p>' +
        '<p> The classes will change per example, and will be marked in bold. Please pay attention to read the text on each page of the experiment. </p>',

        '<p> You will receive a bonus of up to a rate of $9/hour (+$0.25) if the images most closely match what <strong>other crowdsourced workers perceive</strong> as the <strong>50/50 mixture</strong> between those classes.</p>' +
        '<p> We recognize this is a challenging task. Please just try your best! You will receive the base payment for fair effort.</p>',

        '<p> You will select this 50/50 midpoint-image for <strong>' + num_show + ' examples</strong>.</p>' +

        '<p> When you are ready, please click <strong>\"Next\"</strong> to complete a quick comprehension check, before moving on to the experiment. </p>'],
    show_clickable_nav: true
};


var correct_task_description = "Select the image that is most likely to be perceived as a 50/50 mixture of two labels."

var correct_perspective_description = "Other crowdsourced workers."
var incorrect_perspective_description = "Your own."
var incorrect_perspective_description2 = "Your dog's."

var correct_action_selection = "By clicking on an image." // "By pressing letters on the keyboard."

var comprehension_check = {
    type: "survey-multi-choice",
    preamble: ["<p align='center'>Check your knowledge before you begin. If you don't know the answers, don't worry; we will show you the instructions again.</p>"],
    questions: [
        {
            prompt: "What will you be asked to do in this task?",
            options: [correct_task_description, "Determine the similarity between images of cats and trucks.", "Rate the funniness of jokes.",],
            required: true
        },
        {
            prompt: "How will you be providing your answers?</i>",
            options: ["By writing text.", "By selecting an option from a multiple choice scale.", correct_action_selection],
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

        if (responses['Q0'] == correct_task_description && responses['Q1'] == correct_action_selection && responses['Q2'] == correct_perspective_description) {
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
    '<p> Please click <strong>\"Next\"</strong> to start the experiment. </p>' +
    '<p> Note, it may take a few seconds for the first image to load. </p>' +
    '<p> Thank you for participating in our study! </p>'],
    show_clickable_nav: true
};
timeline.push(final_instructions)

// preload stimuli
// while making a datastructure more amenable to timeline usage
var pre_load_imgs = []
var stimuli_data = [] // hold stimuli used (refined versions of loaded "imgs" structure)
for (var i = 0; i < imgs.length; i++){

  var imgBatch = imgs[i]
  // structure = [class_pair: {mixing_coeff: data, mixing_coeff: file_data},
            // other_class_pair: {mixing_coeff: data, mixing_coeff: file_data}, etc.]
  var class_pair = imgBatch[0]
  var interpolated_imgs = imgBatch[1]
  // pre load imgs before clicking to reduce latency
  var mixing_coeffs = Object.keys(interpolated_imgs)
  for (var j = 0; j < mixing_coeffs.length; j++){
    var mixing_coeff = mixing_coeffs[j]
    pre_load_imgs.push("imgs/" + class_pair + "/"+ interpolated_imgs[mixing_coeff]['filename'])
  }

  // stimuli_data.push({"starting_value": starting_value, "class_pair": class_pair,
  //                 "interp_img_data": interpolated_imgs})
  stimuli_data.push({"class_pair": class_pair,
                  "interp_img_data": interpolated_imgs})
}

console.log(stimuli_data)

// preload help from: https://www.jspsych.org/6.3/plugins/jspsych-preload/
var preload = {
    type: 'preload',
    images: pre_load_imgs,
    show_detailed_errors: true
}
timeline.push(preload)

var interpolated_imgs = null
var class_pair = null

var poss_params = ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6", "0.7", "0.8", "0.9","1.0"]

var select_mix = {
	// help for various input forms from: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
	// and: https://www.jspsych.org/7.0/plugins/survey-html-form/
	type: 'survey-html-form',

	html: function(){

    console.log(img)
    var interpolated_imgs = jsPsych.timelineVariable("interp_img_data")

    var stimuliHTML = '<form action="">'
    console.log("poss: ", poss_params)
    console.log("interp imgs: ", interpolated_imgs)
    poss_params = jsPsych.randomization.shuffle(poss_params)
      for (var param_idx = 0; param_idx < poss_params.length; param_idx++){
        var param = poss_params[param_idx]
        console.log("param: ", param)
        var img = interpolated_imgs[param]["filename"]
        console.log("img: ", img)
        var class_pair = jsPsych.timelineVariable("class_pair")
        var img = "imgs/" + class_pair + "/"+ img
        console.log(img)
        // stimuliHTML += '<div class="aligned-box"><input type="radio" id=select'+param+' name=select value=select'+param+' required>'
        // + '<label class="radioImg" for=select'+param+'>' + '<img src=' + img + ' style="max-width:250px; max-height:250px;">' + '</label></div>'
        stimuliHTML += '<div class="aligned-box">' + '<label class="radioImg" for=select'+param+'>' + '<input type="radio" id=select'+param+' name=select value=select'+param+' required>'
        + '<img src=' + img + ' style="max-width:250px; max-height:250px;">' + '</label></div>'
        console.log("data!! ", interpolated_imgs[param])
        var label1 = interpolated_imgs[param]["label1"]
        var label2 = interpolated_imgs[param]["label2"]
      }
      stimuliHTML += "</p></form>"

      var instructionHTML = '<Please click on the image you think would be chosen by <i>100 other crowdsourced workers</i> as a <strong>50\% mixture</strong> between the two classes: <strong>['+ label2 + ', ' +label1 + ']</strong>.</p>'



    var interfaceHTML = instructionHTML + stimuliHTML
    return interfaceHTML;

	},
	button_label: 'NEXT',
}

var select_task = {
    timeline: [select_mix],
    timeline_variables: stimuli_data,
    data: {
        // filename: jsPsych.timelineVariable('filename'),
        task: 'select_shuffled',
        class_pair: jsPsych.timelineVariable('class_pair'),
        // starting_value: starting_value,
        // subj_id: jsPsych.timelineVariable('id'),
        // label1: jsPsych.timelineVariable('label1'),
        // label2: jsPsych.timelineVariable('label2'),
        // label1: jsPsych.timelineVariable('id1'),
        // label2: jsPsych.timelineVariable('id2'),
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
    // on_load: function(){
    //
    //   console.log("START!!")
    //
    //   interpolated_imgs = jsPsych.timelineVariable("interp_img_data")
    //
    //   console.log("interp filenames!! ". interpolated_imgs)
    //
    //   class_pair = jsPsych.timelineVariable("class_pair")
    // },
    on_finish: function () {
        var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(curr_progress_bar_value + progress_bar_increase);
    }
}

timeline.push(select_task)

var rerun_select_task = {
    timeline: [select_mix],
    timeline_variables: stimuli_data,
    data: {
        // filename: jsPsych.timelineVariable('filename'),
        task: 'rerun_select_shuffled',
        class_pair: jsPsych.timelineVariable('class_pair'),
        // starting_value: starting_value,
        // subj_id: jsPsych.timelineVariable('id'),
        // label1: jsPsych.timelineVariable('label1'),
        // label2: jsPsych.timelineVariable('label2'),
        // label1: jsPsych.timelineVariable('id1'),
        // label2: jsPsych.timelineVariable('id2'),
          },
    sample: {
        type: 'custom',
        fn: function (t) {
            // t = set of indices from 0 to n-1, where n = # of trials in stimuli variable
            // returns a set of indices for trials
            return [ordered_idxs[5], ordered_idxs[10]]
        }
    },
    on_start: function(){
      interpolated_imgs = jsPsych.timelineVariable("interp_img_data")
      class_pair = jsPsych.timelineVariable("class_pair")
    },
    on_finish: function () {
        var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
        jsPsych.setProgressBar(curr_progress_bar_value + progress_bar_increase);
    }
}

timeline.push(rerun_select_task)


var comments_block = {
    type: "survey-text",
    preamble: "<p>Thank you for participating in our study!</p>" +
    "<p>Click <strong>\"Finish\"</strong> to complete the experiment and receive compensation. If you have any comments about the experiment, please let us know in the form below.</p>",
    questions: [
        {prompt: "Were the instructions clear? (On a scale of 1-10, with 10 being very clear)"},
        // {prompt: "How challenging was it to create an image that seemed like a 50/50 point? (On a scale of 1-10, with 10 being very challenging)"},
        {prompt: "Did multiple images per example seem like they were a valid 50/50 point?"},
        {prompt: "Were there particular attributes in the images that you looked for to determine which seemed like the 50/50 midpoint?", rows:2,columns:50},
        // {prompt: "Did you find that your stratedgy changed as the experiment progressed? If yes, in what way?", rows:2,columns:50},
        {prompt: "Do you have any additional comments to share with us?", rows: 5, columns: 50}],
    button_label: "Finish",
};
timeline.push(comments_block)
// // for consistency!
// var rerun_rating_task = {
//     timeline: [rating_page],
//     timeline_variables: imgWithSliderLabels,//imgs,
//     data: {
//         filename: jsPsych.timelineVariable('filename'),
//         task: 'rerun_rate_mixture',
//         subj_id: jsPsych.timelineVariable('id'),
//         label1: jsPsych.timelineVariable('label1'),
//         label2: jsPsych.timelineVariable('label2'),
//         mixtureCoeff: jsPsych.timelineVariable('mixture_coeff'),
//         id1: jsPsych.timelineVariable('id1'),
//         id2: jsPsych.timelineVariable('id2')
//     },
//     sample: {
//         type: 'custom',
//         fn: function (t) {
//             // t = set of indices from 0 to n-1, where n = # of trials in stimuli variable
//             // returns a set of indices for trials
//
//             // just have this for a couple of few imgs (checks), help from: https://stackoverflow.com/questions/34883068/how-to-get-first-n-number-of-elements-from-an-array
//             return jsPsych.randomization.shuffle(t).slice(0, num_rerun)
//         }
//     },
//     on_finish: function () {
//         var curr_progress_bar_value = jsPsych.getProgressBarCompleted();
//         jsPsych.setProgressBar(curr_progress_bar_value + progress_bar_increase);
//
//         console.log(curr_progress_bar_value)
//     }
// }
// timeline.push(rerun_rating_task);



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
