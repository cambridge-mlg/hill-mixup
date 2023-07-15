# Human-in-the-Loop Mixup

Katherine M. Collins, Umang Bhatt, Weiyang Liu, Vihari Piratla, Ilia Sucholutsky, Bradley Love, and Adrian Weller

Main Paper: https://proceedings.mlr.press/v216/collins23a/collins23a.pdf

Supplement: https://proceedings.mlr.press/v216/collins23a/collins23a-supp.pdf

UAI, 2023

## Abstract

Aligning model representations to humans has been found to improve robustness and generalization. However, such methods often focus on standard observational data. Synthetic data is proliferating and powering many advances in machine learning; yet, it is not always clear whether synthetic labels are perceptually aligned to humans -- rendering it likely model representations are not human aligned. We focus on the synthetic data used in mixup: a powerful regularizer shown to improve model robustness, generalization, and calibration. We design a comprehensive series of elicitation interfaces, which we release as `HILL MixE Suite`, and recruit 159 participants to provide perceptual judgments along with their uncertainties, over mixup examples. We find that human perceptions do not consistently align with the labels traditionally used for synthetic points, and begin to demonstrate the applicability of these findings to potentially increase the reliability of downstream models, particularly when incorporating human uncertainty. We release all elicited judgments in a new data hub we call `H-Mix`.

## Repository Details

### Data

The `H-Mix` dataset compendium is included in the `h_mix` directory. Details are included in the README in the directory.

### Elicitation Interfaces

All elicitation interfaces released composing the `HILL MixE Suite` are included in the `hill_mixe_suite` directory. We refer to the [`CIFAR-10S` elicitation interface](https://github.com/cambridge-mlg/cifar-10s/tree/master) if looking to collect categorical soft labels in particular. We include our instantiation in `soft_categorical_hill_mix_elic` directory.

### Computational Experiments

Code to run the computational experiments will be included in the `computational_experiments` directory. To be posted shortly; please reach out if needed sooner. 

## Citing

If you use our data, elicitation interfaces, and/or code, please consider citing the following bibtex entry:

```
@inproceedings{collins2023hillMixup,
  title={Human-in-the-loop mixup},
  author={Collins, Katherine M and Bhatt, Umang and Liu, Weiyang and Piratla, Vihari and Sucholutsky, Ilia and Love, Bradley and Weller, Adrian},
  booktitle={Uncertainty in Artificial Intelligence},
  pages={454--464},
  year={2023},
  organization={PMLR}
}

```

## Questions?

If you have any questions about `H-Mix`, `HILL MixE Suite`, or anything else around our paper, please do not hesitate to add a GitHub Issue and/or reach out to Katie Collins (`kmc61@cam.ac.uk`). 
