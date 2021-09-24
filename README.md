# &#x1F4D8; Qonsoll form documentation

[**Qonsoll form**](https://github.com/fractal-academy/feedback-typeform-app) is a service for surveys' form builder. It makes collecting and sharing information comfortable and conversational.
Current project is used as module in other projects.


- [How to run app localy for further changes](#how-to-run-app-localy-for-further-changes)
- [How to implement module in existing project](#how-to-implement-module-in-existing-project)
- [How to run app with already installed module](#how-to-run-app-with-already-installed-module)
- [How to configure workflow](#how-to-configure-workflow)
- [How to configure and use module](#how-to-configure-and-use-module)
- [How to configure module theme](#how-to-configure-module-theme)
- [How to configure translations](#how-to-configure-translations)


## How to run app localy for further changes

Pull the project using folowing command:

```sh
git clone --recurse-submodules https://github.com/fractal-academy/qonsoll-form-wrapper
```

Switch to project folder:

```sh
cd qonsoll-form-wrapper
```

Install all dependecies and pull latest changes:

```sh
npm i
```

Some packages need manual instalation. Run following command:

```sh
npm i fuse.js use-media react-ziggeo ziggeo-client-sdk
```

&#10071; For correct work of components you'll need to add an index to your firebase. In [**console firebase**](https://console.firebase.google.com) select your project, go to Firestore Database menu item and choose Indexes tab.
Add `formId` and `order` as indexed fields for questions collection. Leave index rule default (ascending).

## How to implement module in existing project

If it's first initialisation of module in project create folder for modules in directory of your existing project:

```sh
mkdir src/modules
```

Go to the created folder:

```sh
cd src/modules
```

Add typeform module to your project by following command:

```sh
git submodule add https://github.com/fractal-academy/qonsoll-form.git
```

Go to the /module folder:

```sh
cd qonsoll-form
```

Get newest changes of module:

```sh
git pull origin library
```

Go the directory of your project and install all of packages:

```sh
cd ../../../
```

```sh
npm install
```

Some packages need manual instalation. Run following command:

```sh
npm i fuse.js use-media react-ziggeo ziggeo-client-sdk
```

&#10071; For correct work of components you'll need to add an index to your firebase. In [**console firebase**](https://console.firebase.google.com) select your project, go to Firestore Database menu item and choose Indexes tab.
Add `formId` and `order` as indexed fields for questions collection. Leave index rule default (ascending).

## How to run app with already installed module

After cloning existing project to your computer, install all packages:

```sh
npm install
```

Make shure that there's present /modules folder and .gitmodules file in your project.
Go to /modules folder and use following comands:

```sh
git submodule update --init --recursive
```

```sh
git submodule update --recursive --remote
```

## How to configure workflow

In block steps first you need to install all dependencies.

```sh
- run: npm install
```

Get the latest changes of module. Go to the modules directory:

```sh
- run: cd src/modules
```

By following commands update modules:

```sh
- run: git submodule update --init --recursive
```

```sh
- run: git submodule update --recursive --remote
```

Go back to your project directory and install node modules:

```sh
- run: cd ../../ && npm install
```

Next step - you need to build your application:

```sh
- run: npm run build:dev
```

If you project does'n run after following steps, that means that there's console warnings in you project. To fix that you need to add flag to you run command.

```sh
- run: CI=false npm run build:dev
```

After that, if there's exception that you have not enough memory in docker, you can run following command (it increases volume of memory to 8Gb):

```sh
- run: CI=false NODE_OPTIONS=--max-old-space-size=8192 npm run build:dev
```

## How to configure and use module

For correct module work you need to fulfill next steps.
- To use qonsoll form component, you need to import it and propagate required properties. There are four in total components: `FormsAll`, `FormEdit`, `FormShow` and `FormAnswers`. There's example of component usage:

```sh
import { FormsAll } from 'qonsoll-form/src'
. . .

function YourComponentName() {

  return (
    <FormAll
      firebase={firebase}
      actions={{}}
      id={id}
    />
  )
}
```
As required properties module components need `firebase` object of your application and `actions`. On all routes except `FormsAll` also required `id` of form. Actions are functions, that are responding for routing between qonsoll form routes. There are also optional properties: `translations`,  `childrenModal` (allows to add new form item to form creation modal), `wrapperPaddings`, `titleText` (changes route title) and `showHeader` (allows to use qonsoll form header).
- To correct work of components you need to фвв vars of qonsoll form. Check out [next step](#how-to-configure-module-theme) for it.

## How to configure module theme
- First of all, if you new to qonsoll/react-design package, check out this [**documentation**](https://github.com/qonsoll/react-design/tree/doc-usage-vars). Qonsoll form is built using its components and theme.
- Qonsollform supports theme changing. Most of theme colors and spacings'll be taken from your
- After fulfilling steps from documentation (or if you pulled existing project with configured qonsole/react-design package), you'll have a vars.css file in /styles directory. Extend this file with Qonsole forms vars:

```sh
  /* static list */
  --qf-list-item-bg: var(--ql-color-dark-t-lighten5);
  --qf-list-item-hover: var(--ql-color-dark-t-lighten6);

  --qf-list-item-preview: var(--ql-color-white);

  /* drag and drop */
  --qf-dnd-item-badge-bg: var(--ql-color-dark-lighten1);
  --qf-dnd-item-badge-color: var(--ql-color-white);
  
  --qf-dnd-item-bg: var(--ql-color-dark-t-lighten5);
  --qf-dnd-item-hover: var(--ql-color-dark-t-lighten4); 

  --qf-dnd-active-item-bg: var(--ql-color-accent1-t-lighten4);
  --qf-dnd-active-item-hover: var(--ql-color-accent1-t-lighten3); 

  /* content card */
  --qf-content-card-bg: var(--ql-color-white);

  /* layout */
  --qf-sidebar-bg: var(--ql-color-white);
  --qf-sidebar-width: 350px;
  --qf-header-mb: 8px;

  /* button */
  --qf-button-bg: var(--ql-color-accent1-t-lighten4);
  --qf-button-hover: var(--ql-color-accent1-t-lighten3);
  --qf-active-button-bg: var(--ql-color-accent1-t-lighten2);

  --qf-active-keybox-bg: var(--ql-color-accent1);
  --qf-keybox-bg: var(--ql-color-white);

  --qf-button-color: var(--ql-color-accent1);
  --qf-active-button-color: var(--ql-color-white); 

  --qf-submit-button-font-size: var(--ql-font-size-h4);
  
  /* input */
  --qf-input-background: var(--ql-color-dark-t-lighten5); /* needs refactoring */

  /* tag */
  --qf-tag-color: var(--ql-color-accent1);

  /* uploader */
  --qf-uploader-color: var(--ql-color-white);
  --qf-uploader-bg: var(--ql-color-accent1);
  --qf-uploader-hover: var(--ql-color-accent1-t-lighten1);

  --qf-uploader-item-bg: var(--ql-color-dark-t-lighten5);

  /* domain component: question */
  --qf-question-type-icon-default: var(--ql-color-dark-t-lighten4);
  --qf-question-type-icon-danger: var(--ql-color-danger-t-lighten3);
  --qf-question-header-font-size: var(--ql-font-size-h3);

  /*domain component: condition */
  --qf-condition-item-bg: var(--ql-color-dark-t-lighten6);
  --qf-condition-item-border: var(--ql-color-dark-t-lighten4);

  /* typography */
  --qf-typography-fs-body: var(--ql-font-size-body1);
  --qf-typography-fs-caption: var(--ql-font-size-caption1);

  --qf-typography-title-color: var(--ql-color-dark);
  --qf-typography-subtitle-color: var(--ql-color-dark-t-lighten1);
  --qf-typography-caption-color: var(--ql-color-dark-t-lighten2);

  /* border radius */
  --qf-border-radius-sm: var(--ql-border-radius-sm); /* 6px */
  --qf-border-radius-md: var(--ql-border-radius-md); /* 8px */
  --qf-border-radius-lg: var(--ql-border-radius-16); /* 12px */
  --qf-border-radius-full: var(--ql-border-radius-full); /* 50% */
```
Feel free to change variable values to configure component appearance. Due to unical name of variables, your app'll still remaining its previous appearence.
- Qonsoll form has also overwritten `antd` components vars. Use the following vars with care.

```sh
    /* overwritten menu */
  --ql-menu-item-active-bg: var(--ql-color-accent1-t-lighten3);

  /* overwritten form */
  --ql-form-item-vertical-spacing: 24px;
```

## How to configure translations
Qonsollform will perfectly fine work without translations propagating, but app will appear only in English. If you need to add another interface language, follow next steps:
- First you need to add object with translations to your constants. For example, `qformTranslations.js`. Add following object to it:

```sh
const qformTranslations = (t) => {
  return {
    //global components
    requiredAnswerMessage: t('The answer is required'),
    submitHint: t('Press enter'),
    choicePlaceholder: t('choice'),
    conditionRemovingWarn: t('This option has connected logic, delete it anyway?'),
    removeButton: t('Delete'),
    uploaderHint: t('Click or drag file to this area to upload'),
    itemRemovingHint: t('Delete this item?'),
    questionListTitle: t('Questions'),
    endingListTitle: t('Endings'),
    questionCreationTooltip: t('Create new question'),
    endingCreationTooltip: t('Create new ending'),
    formViewTooltip: t('Form preview'),
    answerViewTooltip: t('Answers preview'),
    longTextHint: t('Shift ⇧ + Enter ↵ to make a line break'),
    textQuestionPlaceholder: t('Type your answer here'),
    
    //domains: form components
    conditionsEndingsTab: t('Endings'),
    conditionsLogicJumpsTab: t('Logic jumps'),
    conditionsQuizTab: t('Answer score configurations'),
    conditionsNoData: t('There are no question to configure'),
    conditionAddQuestionType: t('Please, add one of the following questions types'),
    quizSwitcherText: t('Enable quiz system'),
    formTitlePlaceholder: t('Form name'),
    formSubtitlePlaceholder: t('Form short description'),
    formModalCreateTitle: t('Create new form'),
    formModalEditTitle: t('Edit form'),
    formModalEditButton: t('Save changes'),
    formModalCreateButton: t('Create form'),
    
    //domains: form routes
    phoneBrakepointDummy: t('This feature is available only on desktop'),
    formsAllTitle: t('Forms'),
    formCounter: t('Amount of forms'),
    formSearchPlaceholder: t('Search form by name'),
    
    //domains: condition components
    conditionsEndingSelectPlaceholder: t('Select questions to call current ending'),
    conditionModalTitle: t('Logic'),
    conditionModalResetLogic: t('Reset logic'),
    conditionModalSubmitButton: t('Close'),
    conditionsModalTooltip: t('Configure logic jumps'),
    conditionRedirectRulePlaceholder: t('Select redirect rule'),
    scoreWeightTitle: t('Enter score weight of answer'),
    
    //domains: media library components
    mediaLibraryCounter: t('Amount of shown files'),
    mediaLibraryButton: t('Change'),
    mediaLibrarySearchPlaceholder: t('Search media file by name'),
    mediaLibraryTitle: t('Media library'),
    mediaLibraryBrightness: t('Brightness'),
    
    //domains: question components
    questionFinishButton: t('Finish'),
    questionStartButton: t('Start'),
    questionVideo: t('Video question'),
    questionRequiredSetting: t('Required'),
    questionConfigurationTooltip: t('Configure question'),
    questionTypeConfiguration: t('Question types'),
    questionConfigurationTitle: t('settings'),
    questionRangeBottomSetting: t('From'),
    questionRangeUpperSetting: t('to'),
    questionConfigurationOptions: t('Amount of options'),
    questionEditableTitleHint: t('Editable question title'),
    questionEditableSubtitleHint: t('Description (optional)'),
    questionRemovingPopconfirm: t('Delete this question?'),
    questionWithLogicRemovingPopconfirm: t('This question has connected logic, delete it anyway?'),
    welcomeScreenDesc: t('Invite your audience in'),
    longTextDesc: t('More space to spill the beans'),
    shortTextDesc: t('For short answers, like names'),
    dateDesc: t('Collect answers in date format'),
    fileUploadDesc: t('Upload a file up to 10MB'),
    opinionDesc: t('A customizable, numbered scale'),
    pictureChoiceDesc: t('Multiple choice but prettier'),
    choiceDesc: t('Multiple choice'),
    ratingDesc: t('Rate'),
    statementDesc: t('Take the mic for a moment'),
    yesnoDesc: t('Just 2 options, yes or no')
  }
}

export default qformTranslations
```
- In new component's file (with imported module component), import translations object and propagate it with translating function further:

```sh
import { FormsAll } from 'qonsoll-form/src'
import { useTranslations } from 'app/contexts'
. . .

function YourComponentName() {

const { t } = useTranslations()
const translations = useMemo(() => {
    return qformTranslations(t)
  }, [t])

  return (
    <FormAll
      translations={translations}
      firebase={firebase}
      actions={{}}
    />
  )
}
```
