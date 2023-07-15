`H-Mix` encompasses a compendium of different ``flavors'' of human perceptual data over [mixup](https://arxiv.org/abs/1710.09412) images from the [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html) dataset. We specify which section of our [paper](https://proceedings.mlr.press/v216/collins23a/collins23a.pdf) each dataset corresponds with. 

For each data subset, we include a (lightly processed) csv of the original human participant data. Some column headers are the same across each dataset: 
* `subj_id`: Each participant is assigned a random, unique ID.
* `class_pair`: A tag indicating the two images that are mixed. Formed as: `{endpoint_img1}_{img1_id}_{endpoint_img2}_{img2_id}`. Here, the image id matches the order of the unshuffled `CIFAR-10` test images from the [PyTorch CIFAR-10 dataloader](https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html?highlight=cifar). When a mixing coefficient `lambda` is expressed that means that we computed `lambda * img_1 + (1-lambda) * img_2`, in pixel-space.
* `rt`: time spent on a page in msec
* `condition`: the batch the participant was allocated to (note: while the same condition number usually coincides with the same stimuli, we occasionally ran experiments in rounds, so the same condition number may have different sets of images).

We include dataset-specific details alongside each file.

Specific datasets: 
* `hmix_select_shuffled_midpoint.csv` and `hmix_construct_midpoint.csv`: Selection of the perceived 50/50 point from a set of mixed images (see Section 3), for each of the varieties (Select-Shuffled and Construct). 
     - For `construct_midpoint`: `final_value` is the mixing coefficient (as noted, relative to `img_1`) selected by the participant. `start_value` is the mixing coefficient of the image that the participant saw first before beginning to click.
     - For `select_shuffled`: `response` contains the mixing coefficient selected image. This can be extracted, for an example row (`row`) of the dataframe as: `float(eval(row["response"])["select"]).split("select")[-1])`. We apologize for the messy extraction! 
* `hmix_infer_mixing_factor.csv`: Inference of the generating mixing coefficient for a single image, tagged with annotator uncertainty (see Section 4 and 5).
     - The inferred mixing coefficient, along with participant uncertainty in their inference, are in the `response` column. Stored as a dictionary (extract via "mixingcoeff" and "confidence" keys). `mixtureCoeff` is the mixing coefficient of the stimuli the participant was responding for. `label1` and `label2` are pre-extracted keys of the endpoints from `class_pair`. 
* `hmix_categorical_soft_labels.csv`: Inference of the categories of the images being mixed, expressed as a [soft label from each annotator](https://arxiv.org/abs/2207.00810) (see Section 4.3.2).
     - We include a processed set of labels in ``, following the [`CIFAR-10S` top-2 clamp with redistribution factor 0.1](https://github.com/cambridge-mlg/cifar-10s/tree/master/cifar10s_data). 
     - Please see the `10S` [README](https://github.com/cambridge-mlg/cifar-10s/blob/master/cifar10s_data/README.md) for an interepretation of the saved keys. Different here, as in the `infer_mixing_factor` data, we the mixing coefficient of the image presented is in `mixtureCoeff` with the underlying images mixed and their base labels as separate columns. 
Details on the elicitation interfaces used to collect each dataset are included in the parent directory. Further details on participant recruitment are included in our [Supplement](https://proceedings.mlr.press/v216/collins23a/collins23a-supp.pdf). Please start a GitHub issue, or write to Katie Collins (kmc61@cam.ac.uk), with any questions! 
