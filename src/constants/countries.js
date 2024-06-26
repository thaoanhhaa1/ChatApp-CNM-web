const countries = [
    { name: 'Vietnam', dialling_code: '+84', code: 'VN' },
    { name: 'Taiwan', dialling_code: '+886', code: 'TW' },
    { name: 'South Korea', dialling_code: '+82', code: 'KR' },
    { name: 'China', dialling_code: '+86', code: 'CN' },
    { name: 'Afghanistan', dialling_code: '+93', code: 'AF' },
    { name: 'Albania', dialling_code: '+355', code: 'AL' },
    { name: 'Algeria', dialling_code: '+213', code: 'DZ' },
    { name: 'American Samoa', dialling_code: '+1', code: 'AS' },
    { name: 'Andorra', dialling_code: '+376', code: 'AD' },
    { name: 'Angola', dialling_code: '+244', code: 'AO' },
    { name: 'Anguilla', dialling_code: '+1', code: 'AI' },
    { name: 'Antigua', dialling_code: '+1', code: 'AG' },
    { name: 'Argentina', dialling_code: '+54', code: 'AR' },
    { name: 'Armenia', dialling_code: '+374', code: 'AM' },
    { name: 'Aruba', dialling_code: '+297', code: 'AW' },
    { name: 'Australia', dialling_code: '+61', code: 'AU' },
    { name: 'Austria', dialling_code: '+43', code: 'AT' },
    { name: 'Azerbaijan', dialling_code: '+994', code: 'AZ' },
    { name: 'Bahrain', dialling_code: '+973', code: 'BH' },
    { name: 'Bangladesh', dialling_code: '+880', code: 'BD' },
    { name: 'Barbados', dialling_code: '+1', code: 'BB' },
    { name: 'Belarus', dialling_code: '+375', code: 'BY' },
    { name: 'Belgium', dialling_code: '+32', code: 'BE' },
    { name: 'Belize', dialling_code: '+501', code: 'BZ' },
    { name: 'Benin', dialling_code: '+229', code: 'BJ' },
    { name: 'Bermuda', dialling_code: '+1', code: 'BM' },
    { name: 'Bhutan', dialling_code: '+975', code: 'BT' },
    { name: 'Bolivia', dialling_code: '+591', code: 'BO' },
    { name: 'Bosnia and Herzegovina', dialling_code: '+387', code: 'BA' },
    { name: 'Botswana', dialling_code: '+267', code: 'BW' },
    { name: 'Brazil', dialling_code: '+55', code: 'BR' },
    { name: 'British Indian Ocean Territory', dialling_code: '+246', code: 'IO' },
    { name: 'British Virgin Islands', dialling_code: '+1', code: 'VG' },
    { name: 'Brunei', dialling_code: '+673', code: 'BN' },
    { name: 'Bulgaria', dialling_code: '+359', code: 'BG' },
    { name: 'Burkina Faso', dialling_code: '+226', code: 'BF' },
    { name: 'Burma Myanmar', dialling_code: '+95', code: 'MM' },
    { name: 'Burundi', dialling_code: '+257', code: 'BI' },
    { name: 'Cambodia', dialling_code: '+855', code: 'KH' },
    { name: 'Cameroon', dialling_code: '+237', code: 'CM' },
    { name: 'Canada', dialling_code: '+1', code: 'CA' },
    { name: 'Cape Verde', dialling_code: '+238', code: 'CV' },
    { name: 'Cayman Islands', dialling_code: '+1', code: 'KY' },
    { name: 'Central African Republic', dialling_code: '+236', code: 'CF' },
    { name: 'Chad', dialling_code: '+235', code: 'TD' },
    { name: 'Chile', dialling_code: '+56', code: 'CL' },
    { name: 'Colombia', dialling_code: '+57', code: 'CO' },
    { name: 'Comoros', dialling_code: '+269', code: 'KM' },
    { name: 'Cook Islands', dialling_code: '+682', code: 'CK' },
    { name: 'Costa Rica', dialling_code: '+506', code: 'CR' },
    { name: "Côte d'Ivoire", dialling_code: '+225', code: 'CI' },
    { name: 'Croatia', dialling_code: '+385', code: 'HR' },
    { name: 'Cuba', dialling_code: '+53', code: 'CU' },
    { name: 'Cyprus', dialling_code: '+357', code: 'CY' },
    { name: 'Czech Republic', dialling_code: '+420', code: 'CZ' },
    { name: 'Democratic Republic of Congo', dialling_code: '+243', code: 'CD' },
    { name: 'Denmark', dialling_code: '+45', code: 'DK' },
    { name: 'Djibouti', dialling_code: '+253', code: 'DJ' },
    { name: 'Dominica', dialling_code: '+1', code: 'DM' },
    { name: 'Dominican Republic', dialling_code: '+1', code: 'DO' },
    { name: 'Ecuador', dialling_code: '+593', code: 'EC' },
    { name: 'Egypt', dialling_code: '+20', code: 'EG' },
    { name: 'El Salvador', dialling_code: '+503', code: 'SV' },
    { name: 'Equatorial Guinea', dialling_code: '+240', code: 'GQ' },
    { name: 'Eritrea', dialling_code: '+291', code: 'ER' },
    { name: 'Estonia', dialling_code: '+372', code: 'EE' },
    { name: 'Ethiopia', dialling_code: '+251', code: 'ET' },
    { name: 'Falkland Islands', dialling_code: '+500', code: 'FK' },
    { name: 'Faroe Islands', dialling_code: '+298', code: 'FO' },
    { name: 'Federated States of Micronesia', dialling_code: '+691', code: 'FM' },
    { name: 'Fiji', dialling_code: '+679', code: 'FJ' },
    { name: 'Finland', dialling_code: '+358', code: 'FI' },
    { name: 'France', dialling_code: '+33', code: 'FR' },
    { name: 'French Guiana', dialling_code: '+594', code: 'GF' },
    { name: 'French Polynesia', dialling_code: '+689', code: 'PF' },
    { name: 'Gabon', dialling_code: '+241', code: 'GA' },
    { name: 'Georgia', dialling_code: '+995', code: 'GE' },
    { name: 'Germany', dialling_code: '+49', code: 'DE' },
    { name: 'Ghana', dialling_code: '+233', code: 'GH' },
    { name: 'Gibraltar', dialling_code: '+350', code: 'GI' },
    { name: 'Greece', dialling_code: '+30', code: 'GR' },
    { name: 'Greenland', dialling_code: '+299', code: 'GL' },
    { name: 'Grenada', dialling_code: '+1', code: 'GD' },
    { name: 'Guadeloupe', dialling_code: '+590', code: 'GP' },
    { name: 'Guam', dialling_code: '+1', code: 'GU' },
    { name: 'Guatemala', dialling_code: '+502', code: 'GT' },
    { name: 'Guinea', dialling_code: '+224', code: 'GN' },
    { name: 'Guinea-Bissau', dialling_code: '+245', code: 'GW' },
    { name: 'Guyana', dialling_code: '+592', code: 'GY' },
    { name: 'Haiti', dialling_code: '+509', code: 'HT' },
    { name: 'Honduras', dialling_code: '+504', code: 'HN' },
    { name: 'Hong Kong', dialling_code: '+852', code: 'HK' },
    { name: 'Hungary', dialling_code: '+36', code: 'HU' },
    { name: 'Iceland', dialling_code: '+354', code: 'IS' },
    { name: 'India', dialling_code: '+91', code: 'IN' },
    { name: 'Indonesia', dialling_code: '+62', code: 'ID' },
    { name: 'Iran', dialling_code: '+98', code: 'IR' },
    { name: 'Iraq', dialling_code: '+964', code: 'IQ' },
    { name: 'Ireland', dialling_code: '+353', code: 'IE' },
    { name: 'Israel', dialling_code: '+972', code: 'IL' },
    { name: 'Italy', dialling_code: '+39', code: 'IT' },
    { name: 'Jamaica', dialling_code: '+1', code: 'JM' },
    { name: 'Japan', dialling_code: '+81', code: 'JP' },
    { name: 'Jordan', dialling_code: '+962', code: 'JO' },
    { name: 'Kazakhstan', dialling_code: '+7', code: 'KZ' },
    { name: 'Kenya', dialling_code: '+254', code: 'KE' },
    { name: 'Kiribati', dialling_code: '+686', code: 'KI' },
    { name: 'Kosovo', dialling_code: '+381', code: 'XK' },
    { name: 'Kuwait', dialling_code: '+965', code: 'KW' },
    { name: 'Kyrgyzstan', dialling_code: '+996', code: 'KG' },
    { name: 'Laos', dialling_code: '+856', code: 'LA' },
    { name: 'Latvia', dialling_code: '+371', code: 'LV' },
    { name: 'Lebanon', dialling_code: '+961', code: 'LB' },
    { name: 'Lesotho', dialling_code: '+266', code: 'LS' },
    { name: 'Liberia', dialling_code: '+231', code: 'LR' },
    { name: 'Libya', dialling_code: '+218', code: 'LY' },
    { name: 'Liechtenstein', dialling_code: '+423', code: 'LI' },
    { name: 'Lithuania', dialling_code: '+370', code: 'LT' },
    { name: 'Luxembourg', dialling_code: '+352', code: 'LU' },
    { name: 'Macau', dialling_code: '+853', code: 'MO' },
    { name: 'Macedonia', dialling_code: '+389', code: 'MK' },
    { name: 'Madagascar', dialling_code: '+261', code: 'MG' },
    { name: 'Malawi', dialling_code: '+265', code: 'MW' },
    { name: 'Malaysia', dialling_code: '+60', code: 'MY' },
    { name: 'Maldives', dialling_code: '+960', code: 'MV' },
    { name: 'Mali', dialling_code: '+223', code: 'ML' },
    { name: 'Malta', dialling_code: '+356', code: 'MT' },
    { name: 'Marshall Islands', dialling_code: '+692', code: 'MH' },
    { name: 'Martinique', dialling_code: '+596', code: 'MQ' },
    { name: 'Mauritania', dialling_code: '+222', code: 'MR' },
    { name: 'Mauritius', dialling_code: '+230', code: 'MU' },
    { name: 'Mayotte', dialling_code: '+262', code: 'YT' },
    { name: 'Mexico', dialling_code: '+52', code: 'MX' },
    { name: 'Moldova', dialling_code: '+373', code: 'MD' },
    { name: 'Monaco', dialling_code: '+377', code: 'MC' },
    { name: 'Mongolia', dialling_code: '+976', code: 'MN' },
    { name: 'Montenegro', dialling_code: '+382', code: 'ME' },
    { name: 'Montserrat', dialling_code: '+1', code: 'MS' },
    { name: 'Morocco', dialling_code: '+212', code: 'MA' },
    { name: 'Mozambique', dialling_code: '+258', code: 'MZ' },
    { name: 'Namibia', dialling_code: '+264', code: 'NA' },
    { name: 'Nauru', dialling_code: '+674', code: 'NR' },
    { name: 'Nepal', dialling_code: '+977', code: 'NP' },
    { name: 'Netherlands', dialling_code: '+31', code: 'NL' },
    { name: 'Netherlands Antilles', dialling_code: '+599', code: 'AN' },
    { name: 'New Caledonia', dialling_code: '+687', code: 'NC' },
    { name: 'New Zealand', dialling_code: '+64', code: 'NZ' },
    { name: 'Nicaragua', dialling_code: '+505', code: 'NI' },
    { name: 'Niger', dialling_code: '+227', code: 'NE' },
    { name: 'Nigeria', dialling_code: '+234', code: 'NG' },
    { name: 'Niue', dialling_code: '+683', code: 'NU' },
    { name: 'Norfolk Island', dialling_code: '+672', code: 'NF' },
    { name: 'North Korea', dialling_code: '+850', code: 'KP' },
    { name: 'Northern Mariana Islands', dialling_code: '+1', code: 'MP' },
    { name: 'Norway', dialling_code: '+47', code: 'NO' },
    { name: 'Oman', dialling_code: '+968', code: 'OM' },
    { name: 'Pakistan', dialling_code: '+92', code: 'PK' },
    { name: 'Palau', dialling_code: '+680', code: 'PW' },
    { name: 'Palestine', dialling_code: '+970', code: 'PS' },
    { name: 'Panama', dialling_code: '+507', code: 'PA' },
    { name: 'Papua New Guinea', dialling_code: '+675', code: 'PG' },
    { name: 'Paraguay', dialling_code: '+595', code: 'PY' },
    { name: 'Peru', dialling_code: '+51', code: 'PE' },
    { name: 'Philippines', dialling_code: '+63', code: 'PH' },
    { name: 'Poland', dialling_code: '+48', code: 'PL' },
    { name: 'Portugal', dialling_code: '+351', code: 'PT' },
    { name: 'Puerto Rico', dialling_code: '+1', code: 'PR' },
    { name: 'Qatar', dialling_code: '+974', code: 'QA' },
    { name: 'Republic of the Congo', dialling_code: '+242', code: 'CG' },
    { name: 'Réunion', dialling_code: '+262', code: 'RE' },
    { name: 'Romania', dialling_code: '+40', code: 'RO' },
    { name: 'Russia', dialling_code: '+7', code: 'RU' },
    { name: 'Rwanda', dialling_code: '+250', code: 'RW' },
    { name: 'Saint Barthélemy', dialling_code: '+590', code: 'BL' },
    { name: 'Saint Helena', dialling_code: '+290', code: 'SH' },
    { name: 'Saint Kitts and Nevis', dialling_code: '+1', code: 'KN' },
    { name: 'Saint Martin', dialling_code: '+590', code: 'MF' },
    { name: 'Saint Pierre and Miquelon', dialling_code: '+508', code: 'PM' },
    { name: 'Saint Vincent and the Grenadines', dialling_code: '+1', code: 'VC' },
    { name: 'Samoa', dialling_code: '+685', code: 'WS' },
    { name: 'San Marino', dialling_code: '+378', code: 'SM' },
    { name: 'São Tomé and Príncipe', dialling_code: '+239', code: 'ST' },
    { name: 'Saudi Arabia', dialling_code: '+966', code: 'SA' },
    { name: 'Senegal', dialling_code: '+221', code: 'SN' },
    { name: 'Serbia', dialling_code: '+381', code: 'RS' },
    { name: 'Seychelles', dialling_code: '+248', code: 'SC' },
    { name: 'Sierra Leone', dialling_code: '+232', code: 'SL' },
    { name: 'Singapore', dialling_code: '+65', code: 'SG' },
    { name: 'Slovakia', dialling_code: '+421', code: 'SK' },
    { name: 'Slovenia', dialling_code: '+386', code: 'SI' },
    { name: 'Solomon Islands', dialling_code: '+677', code: 'SB' },
    { name: 'Somalia', dialling_code: '+252', code: 'SO' },
    { name: 'South Africa', dialling_code: '+27', code: 'ZA' },
    { name: 'Spain', dialling_code: '+34', code: 'ES' },
    { name: 'Sri Lanka', dialling_code: '+94', code: 'LK' },
    { name: 'St. Lucia', dialling_code: '+1', code: 'LC' },
    { name: 'Sudan', dialling_code: '+249', code: 'SD' },
    { name: 'Suriname', dialling_code: '+597', code: 'SR' },
    { name: 'Swaziland', dialling_code: '+268', code: 'SZ' },
    { name: 'Sweden', dialling_code: '+46', code: 'SE' },
    { name: 'Switzerland', dialling_code: '+41', code: 'CH' },
    { name: 'Syria', dialling_code: '+963', code: 'SY' },
    { name: 'Tajikistan', dialling_code: '+992', code: 'TJ' },
    { name: 'Tanzania', dialling_code: '+255', code: 'TZ' },
    { name: 'Thailand', dialling_code: '+66', code: 'TH' },
    { name: 'The Bahamas', dialling_code: '+1', code: 'BS' },
    { name: 'The Gambia', dialling_code: '+220', code: 'GM' },
    { name: 'Timor-Leste', dialling_code: '+670', code: 'TL' },
    { name: 'Togo', dialling_code: '+228', code: 'TG' },
    { name: 'Tokelau', dialling_code: '+690', code: 'TK' },
    { name: 'Tonga', dialling_code: '+676', code: 'TO' },
    { name: 'Trinidad and Tobago', dialling_code: '+1', code: 'TT' },
    { name: 'Tunisia', dialling_code: '+216', code: 'TN' },
    { name: 'Turkey', dialling_code: '+90', code: 'TR' },
    { name: 'Turkmenistan', dialling_code: '+993', code: 'TM' },
    { name: 'Turks and Caicos Islands', dialling_code: '+1', code: 'TC' },
    { name: 'Tuvalu', dialling_code: '+688', code: 'TV' },
    { name: 'Uganda', dialling_code: '+256', code: 'UG' },
    { name: 'Ukraine', dialling_code: '+380', code: 'UA' },
    { name: 'United Arab Emirates', dialling_code: '+971', code: 'AE' },
    { name: 'United Kingdom', dialling_code: '+44', code: 'GB' },
    { name: 'United States', dialling_code: '+1', code: 'US' },
    { name: 'Uruguay', dialling_code: '+598', code: 'UY' },
    { name: 'US Virgin Islands', dialling_code: '+1', code: 'VI' },
    { name: 'Uzbekistan', dialling_code: '+998', code: 'UZ' },
    { name: 'Vanuatu', dialling_code: '+678', code: 'VU' },
    { name: 'Vatican City', dialling_code: '+39', code: 'VA' },
    { name: 'Venezuela', dialling_code: '+58', code: 'VE' },
    { name: 'Wallis and Futuna', dialling_code: '+681', code: 'WF' },
    { name: 'Yemen', dialling_code: '+967', code: 'YE' },
    { name: 'Zambia', dialling_code: '+260', code: 'ZM' },
    { name: 'Zimbabwe', dialling_code: '+263', code: 'ZW' },
];

export default countries;
