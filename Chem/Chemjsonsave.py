import json

ChemMatch = {
    'stoichiometric relationships': {
        'IB': ['reacting masses & volumes', 'matter chemical change & the mole concept', 'solubility'],
        'AP': ['net ionic equations', 'introduction to titration'],
        'AL': ['formulae equations & avogadro', 'reaction calculations']
    },
    'periodicity': {
        'IB': ['the periodic table & periodic trends', 'oxides group 1 & group 17', 'transition metals'],
        'AP': [],
        'AL': ['the periodic table', 'groups 1 & 17', 'group 2', 'principles of transition metal chemistry', 'reactions of transition metal elements']
    },
    'chemical bonding & structure': {
        'IB': ['atomic & electronic structure', 'ionic & covalent bonding', 'resonance shapes & giant structures', 'intermolecular forces & metallic bonding', 'more structures & shapes', 'further aspects of bonding', 'electrons in atoms'],
        'AP': ['atomic structure & electron configuration', 'structure of ionic solids', 'lewis diagrams', 'ideal gas law'],
        'AL': ['atomic structure', 'ions & electrons', 'bonding', 'structure']
    },
    'energetics & thermochemistry': {
        'IB': ['energetics', "hess's law", 'bond enthalpy', 'energy cycles', 'entropy & spontaneity'],
        'AP': ['heat capacity & calorimetry', 'enthalpy of formation', 'absolute entropy & entropy change', 'gibbs free energy & thermodynamic favorability', 'free energy & equilibrium'],
        'AL': ['energetics i', 'energetics ii bornhaber', 'energetics ii entropy']
    },
    'chemical kinetics': {
        'IB': ['chemical kinetics', 'rate expression & reaction mechanism', 'activation energy'],
        'AP': ['reaction rates', 'concentration changes over time', 'reaction mechanism & rate law'],
        'AL': ['kinetics i', 'kinetics ii']
    },
    'equilibrium': {
        'IB': ['equilibrium', 'the equilibrium law', 'calculations involving acids & bases'],
        'AP': ['reaction quotient & equilibrium constant', 'calculating the equilibrium constant', 'calculating equilibrium concentrations', 'introduction to solubility equilibria'],
        'AL': ['equilibrium i', 'equilibrium ii']
    },
    'acids & bases': {
        'IB': ['theories & reactions of acids & bases', 'more about acids', 'acid deposition', 'further aspects of acids & bases'],
        'AP': ['introduction to acids & bases', 'weak acid & base equilibria', 'acidbase titrations', 'ph & pka', 'buffer capacity'],
        'AL': ['acidbase equilibria']
    },
    'redox processes': {
        'IB': ['redox processes', 'electrochemical cells'],
        'AP': ['cell potential & free energy', 'cell potential under nonstandard conditions', 'electrolysis & faradays law'],
        'AL': ['redox i', 'redox ii']
    },
    'organic chemistry': {
        'IB': ['fundamentals of organic chemistry', 'functional group chemistry', 'types of organic reactions', 'synthetic routes', 'stereoisomerism'],
        'AP': [],
        'AL': ['introduction to organic chemistry', 'alkanes', 'alkenes', 'halogenoalkanes', 'alcohols', 'organic chemistry ii carbonyl chemistry', 'organic chemistry ii carboxylic acids', 'organic chemistry iii aromatic chemistry', 'organic chemistry iii nitrogen chemistry', 'organic chemistry iii organic synthesis']
    },
    'measurements & data processes': {
        'IB': ['synoptic data handling & graphical skills', 'spectroscopic identification', 'spectroscopic identification of organic compounds'],
        'AP': ['separation of solution & mixtures chromatography', 'beerlambert law'],
        'AL': ['modern analytical techniques i', 'physical chemistry core practicals', 'inorganic & organic chemistry core practicals', 'modern analytical techniques ii', 'advanced inorganic & organic chemistry core practicals']
    }
}

# Specify the directory where you want to save the file
directory = '/Users/nigelma/WebProjects/TBProject/Chem'  # Change this to your desired directory
file_path = directory + 'ChemMatch.json'

# Convert to JSON and save to the specified directory
with open(file_path, 'w') as f:
    json.dump(ChemMatch, f)