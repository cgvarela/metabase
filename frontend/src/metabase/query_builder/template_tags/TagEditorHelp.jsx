import React, { Component, PropTypes } from "react";
import MetabaseAnalytics from "metabase/lib/analytics";

import Code from "metabase/components/Code.jsx";

const EXAMPLES = {
    variable: {
        database: null,
        type: "native",
        native: {
            query: "SELECT count(*)\nFROM products\nWHERE category = {{category}}",
            template_tags: {
                "category": { name: "category", display_name: "Category", type: "text", required: true, default: "Widget" }
            }
        },

    },
    dimension: {
        database: null,
        type: "native",
        native: {
            query: "SELECT count(*)\nFROM products\nWHERE {{created_at}}",
            template_tags: {
                "created_at": { name: "created_at", display_name: "Created At", type: "dimension", dimension: null }
            }
        }
    },
    optional: {
        database: null,
        type: "native",
        native: {
            query: "SELECT count(*)\nFROM products\n[[WHERE category = {{category}}]]",
            template_tags: {
                "category": { name: "category", display_name: "Category", type: "text", required: false }
            }
        }
    },
    multipleOptional: {
        database: null,
        type: "native",
        native: {
            query: "SELECT count(*)\nFROM products\nWHERE 1=1\n  [[AND id = {{id}}]]\n  [[AND category = {{category}}]]",
            template_tags: {
                "id": { name: "id", display_name: "ID", type: "number", required: false },
                "category": { name: "category", display_name:"Category", type: "text", required: false }
            }
        }
    },
}


const TagExample = ({ datasetQuery, setQuery }) =>
    <div>
        <h5>Example:</h5>
        <p>
            <Code>{datasetQuery.native.query}</Code>
            { setQuery && (
                <div
                    className="Button Button--small"
                    onClick={() => {
                        MetabaseAnalytics.trackEvent('QueryBuilder', 'Template Tage Example Query Used')
                        setQuery(datasetQuery, true)
                    }}>
                        Try it
                </div>
            )}
        </p>
    </div>

const TagEditorHelp = ({ setQuery, sampleDatasetId }) => {
    let setQueryWithSampleDatasetId = null;
    if (sampleDatasetId != null) {
        setQueryWithSampleDatasetId = (dataset_query, run) => {
            setQuery({
                ...dataset_query,
                database: sampleDatasetId
            }, run);
        }
    }
    return (
        <div>
            <h4>What's this for?</h4>
            <p>
                Variables in native queries let you dynamically replace values in your
                queries using filter widgets or through the URL.
            </p>

            <h4>Variables</h4>
            <p>
                <Code>{"{{variable_name}}"}</Code> creates a variable in this SQL template called "variable_name".
                Variables can be given types in the side panel, which changes their behavior. All
                variable types other than "dimension" will cause a filter widget to be placed on this
                question. When this filter widget is filled in, that value replaces the variable in the SQL
                template.
            </p>
            <TagExample datasetQuery={EXAMPLES.variable} setQuery={setQueryWithSampleDatasetId} />

            <h4>Dimensions</h4>
            <p>
                Giving a variable the "dimension" type allows you to link SQL cards to dashboard
                filter widgets. A "dimension" variable inserts SQL similar to that generated by the
                GUI query builder when adding filters on existing columns. When adding a dimension,
                you should link that variable to a specific column. Dimensions should be used inside
                of a "WHERE" clause.
            </p>
            <TagExample datasetQuery={EXAMPLES.dimension} setQuery={setQueryWithSampleDatasetId} />

            <h4>Optional Clauses</h4>
            <p>
                <Code>{"[[brackets around a {{variable}}]]"}</Code> create an optional clause in the
                template. If "variable" is set, then the entire clause is placed into the template.
                If not, then the entire clause is ignored.
            </p>
            <TagExample datasetQuery={EXAMPLES.optional} setQuery={setQueryWithSampleDatasetId} />

            <p>
                To use multiple optional clauses you can include at least one non-optional WHERE clause
                followed by optional clauses starting with "AND".
            </p>
            <TagExample datasetQuery={EXAMPLES.multipleOptional} setQuery={setQueryWithSampleDatasetId} />

            <p>
                <a href="http://www.metabase.com/docs/latest/users-guide/start" target="_blank" onClick={() => MetabaseAnalytics.trackEvent('QueryBuilder', 'Template Tag Documentation Click') }>Read the full documentation</a>
            </p>
        </div>
    )
}

export default TagEditorHelp;
