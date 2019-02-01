# Perseo Context-Aware CEP

[![FIWARE Processing](https://nexus.lab.fiware.org/static/badges/chapters/processing.svg)](https://www.fiware.org/developers/catalogue/)
[![License: AGPLv3+](https://img.shields.io/badge/License-AGPLv3+-blue.svg)](./LICENSE)
[![Docker Status](https://img.shields.io/docker/pulls/fiware/perseo.svg)](https://hub.docker.com/r/fiware/perseo/)
[![Support badge](https://img.shields.io/badge/tag-fiware--perseo-orange.svg?logo=stackoverflow)](https://stackoverflow.com/questions/tagged/fiware-perseo)
<br>
[![Documentation badge](https://img.shields.io/readthedocs/perseo.svg)](https://perseo.readthedocs.io/en/latest/)
[![Build Status](https://travis-ci.org/telefonicaid/perseo-fe.svg?branch=master)](https://travis-ci.org/telefonicaid/perseo-fe)
![Status](https://nexus.lab.fiware.org/static/badges/statuses/perseo.svg)
[![Swagger Validator](https://img.shields.io/swagger/valid/2.0/https/raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/json/petstore-expanded.json.svg)](https://app.swaggerhub.com/apis/smartsdk/ngsi-tsdb)

## Overview

Perseo is a Complex Event Processing (CEP) software designed to be fully *NGSIv2*-compliant. It uses NGSIv2 as the communication protocol for events, and thus, Perseo is able to seamless and jointly work with *context brokers* such as [Orion](https://github.com/telefonicaid/fiware-orion).

This project is part of [FIWARE](https://www.fiware.org). You can find more FIWARE components in the [FIWARE catalogue](https://catalogue.fiware.org).

## Content

-   [Background](#background)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API](#api)
-   [Testing](#testing)
-   [Quality Assurance](#quality-assurance)
-   [More Information](#more-information)
-   [License](#license)

## Background

Perseo is an [Esper](http://www.espertech.com/esper/)-based Complex Event Processing (CEP) software supporting the NGSIv2 protocol. 

It follows a straightforward idea: listening to events coming from context information to identify patterns described by rules, in order to immediately react upon them by triggering actions.

![Perseo Components](images/PerseoComponents.png)

By leveraging on the [notifications mechanism](http://fiware-orion.readthedocs.io/en/latest/user/walkthrough_apiv2/index.html#subscriptions), clients instruct Orion CB to notify Perseo of the changes in the entities they care about (`Event API`). Details of this process are explained in the [Getting started with Perseo](usermanual.md#getting-started-with-perseo) section of the [User & Programmers Manual](usermanual.md). Then, rules to the CORE Rule Engine can be easily managed using the publicly available WireCloud operational dashboard, or making use of any of the REST clients able to programmaticly use the Perseo's `Rule API`. These rules will identify patterns that will trigger actions with Orion to create or update entities, or with other different components or external systems, such as Web (HTTP), Email (SMTP) or SMS (SMPP) servers.


## Installation

The instructions to install Perseo can be found in the
[Installation Guide](setup.md)

## Usage

Information about how to use Perseo can be found in the
[User & Programmers Manual](usermanual.md)

## API

APIs and examples of their usage can be found
[here](https://perseo.readthedocs.io/en/latest/api.html)

## Testing

For performing a basic end-to-end test, you can follow the detailed instructions [here](testing.md).

## More Information

- Refer to the [Esper Reference Documentation](http://esper.espertech.com/release-6.1.0/esper-reference/html/index.html) for info on how to use EPL as a rule language.